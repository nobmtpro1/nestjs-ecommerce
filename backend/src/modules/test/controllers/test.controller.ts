import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseSuccess } from 'src/commons/dtos/response.dto';
import { Public } from 'src/commons/decorators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { sleep } from 'src/commons/helpers';
import { UserService } from '../../user/services/user.service';

@Controller('test')
export class TestController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(UserService) private userService: UserService,
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
}
