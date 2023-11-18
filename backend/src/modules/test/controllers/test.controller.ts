import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Header,
  Inject,
  ParseIntPipe,
  Post,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseSuccess } from 'src/commons/response';
import { Public } from 'src/decorators/public.decorator';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { sleep, uploadFile } from '../../../commons/helpers';
import { UserService } from '../../user/services/user.service';
import { Role } from 'src/enums/user-role.enum';
import { Permission } from 'src/enums/user-permission.enum';
import { ConfigService } from '@nestjs/config';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import { Permissions } from 'src/decorators/permissions.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import * as Multer from 'multer';
import { MinioClientService } from 'src/modules/minio-client/minio-client.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { instanceToPlain } from 'class-transformer';
import axios from 'axios';
import xlsx from 'node-xlsx';
import { UserRepository } from 'src/repositories/user.repository';

@Controller('test')
export class TestController {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private userService: UserService,
    private configService: ConfigService,
    private minioClientService: MinioClientService,
    private userRepository: UserRepository,
    @InjectQueue('email')
    private readonly emailQueue: Queue,
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
    return new ResponseSuccess('Upload success', { a: 123, user });
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

    const job = await this.emailQueue.add('welcome', {
      user: instanceToPlain(user),
    });
    console.log(job);
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
  async uploadSingle(@UploadedFile() image: Express.Multer.File) {
    console.log(image);
    let uploaded_image = await this.minioClientService.upload(image);

    return {
      image_url: uploaded_image.url,
      message: 'Successfully uploaded to MinIO S3',
    };
  }

  @Public()
  @Post('upload')
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
  async upload(@UploadedFile() image: Express.Multer.File) {
    console.log(image);
    const result = uploadFile('public/uploads', image);
    return new ResponseSuccess('upload', result);
  }

  @Public()
  @UseInterceptors(LoggingInterceptor)
  @Get('interceptor')
  async interceptor() {
    // await sleep(1000);
    return new ResponseSuccess('interceptor');
  }

  @Public()
  @Get('axios')
  async axios() {
    const products = await axios.get(
      'https://610e5b4548beae001747bad5.mockapi.io/products',
    );
    return new ResponseSuccess('axios', products.data);
  }

  @Public()
  @Post('import')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async import(@UploadedFile() file: Express.Multer.File) {
    const workSheetsFromBuffer = xlsx.parse(file.buffer);
    const data = workSheetsFromBuffer?.[0].data;
    console.log(data);
    return new ResponseSuccess('import', data);
  }

  @Public()
  @Get('export')
  // @Header('Content-Type', 'application/octet-stream')
  // @Header('Content-Disposition', 'attachment; filename="package.xlsx"')
  async export(@Res({ passthrough: true }) res: any): Promise<StreamableFile> {
    const users = await this.userRepository.find();
    const data = [['ID', 'Name', 'Email']];
    users.forEach((user) => {
      data.push([user.id.toString(), user.name, user.email]);
    });
    const buffer = xlsx.build([
      { name: 'mySheetName', data: data, options: {} },
    ]);
    const filename = 'package.xlsx';
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });
    return new StreamableFile(buffer);
  }

  @Public()
  @Get('paginate')
  async paginate(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    console.log(page);
    const users = await this.userRepository.paginate({ limit, page });
    return new ResponseSuccess('Upload success', users);
  }
}
