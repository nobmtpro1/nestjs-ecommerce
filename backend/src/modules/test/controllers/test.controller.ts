import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseSuccess } from 'src/commons/response';
import { Public } from 'src/decorators/public.decorator';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { sleep } from '../../../commons/helpers';
import { UserService } from '../../user/services/user.service';
import { Role } from 'src/enums/user-role.enum';
import { Permission } from 'src/enums/user-permission.enum';
import { ConfigService } from '@nestjs/config';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import { Permissions } from 'src/decorators/permissions.decorator';
import { MailService } from 'src/modules/mail/mail.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/interfaces/file.interface';
import { MinioClientService } from 'src/modules/minio-client/minio-client.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('test')
export class TestController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(UserService) private userService: UserService,
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(MailService) private mailService: MailService,
    @Inject(MinioClientService) private minioClientService: MinioClientService,
  ) {}

  @Public()
  @Get('cache')
  async cache() {
    let cacheValue = await this.cacheManager.get('test');
    console.log('cached', cacheValue);
    if (cacheValue) {
      return new ResponseSuccess('Upload success', cacheValue);
    }
    await sleep(5000);
    cacheValue = await this.cacheManager.set('test', 'TEST_CACHE', 1000000);
    console.log('no cached', cacheValue);
    return new ResponseSuccess('Upload success', cacheValue);
  }

  @Public()
  @Get('serialize')
  @UseInterceptors(ClassSerializerInterceptor)
  async serialize() {
    const user = await this.userService.findOne('admin@gmail.com');
    console.log(user);
    return new ResponseSuccess('Upload success', user);
  }

  @Public()
  @Get('authorization')
  async authorization() {
    const user = await this.userService.findOne('admin@gmail.com');
    user.roles = [Role.ADMIN];
    user.permissions = [Permission.PRODUCT_MANAGE, Permission.PRODUCT_CREATE];
    user.save();
    console.log(user);
    return new ResponseSuccess('Upload success', user);
  }

  @Public()
  @Get('config')
  async config() {
    console.log(this.configService);
    return new ResponseSuccess('Upload success', this.configService);
  }

  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Roles(Role.ADMIN)
  @Permissions(Permission.PRODUCT_CREATE)
  @Get('role')
  async role() {
    return new ResponseSuccess('Upload success', this.configService);
  }

  @Public()
  @Get('mail')
  async mail() {
    const user = await this.userService.findOne('admin@gmail.com');
    await this.mailService.welcome(user);
    return new ResponseSuccess('Send mail success');
  }

  @Public()
  @Post('minio')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingle(@UploadedFile() image: BufferedFile) {
    console.log(image);
    let uploaded_image = await this.minioClientService.upload(image);

    return {
      image_url: uploaded_image.url,
      message: 'Successfully uploaded to MinIO S3',
    };
  }
}
