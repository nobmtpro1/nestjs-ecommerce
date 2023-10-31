import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseSuccess } from 'src/commons/response';
import { Public } from 'src/decorators/public.decorator';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { sleep } from 'src/commons/helpers';
import { UserService } from '../../user/services/user.service';
import { Role } from 'src/enums/user-role.enum';
import { Permission } from 'src/enums/user-permission.enum';
import { ConfigService } from '@nestjs/config';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('test')
export class TestController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(UserService) private userService: UserService,
    @Inject(ConfigService) private configService: ConfigService,
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

  @Public()
  @Roles(Role.USER)
  @Get('role')
  async role() {
    return new ResponseSuccess('Upload success', this.configService);
  }
}
