import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../../authentication/guards/auth.guard';
import { Public } from 'src/modules/authentication/decorators/public.decorator';
import { ResponseSuccess } from 'src/modules/common/response';
import { JwtAuthGuard } from 'src/modules/authentication/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getHello(): Promise<ResponseSuccess> {
    const users = await this.userService.getHello();
    return new ResponseSuccess('Success', users);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  async getProfile(@Request() request): Promise<ResponseSuccess> {
    console.log(request.user);
    if (!request.user) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne(request.user.email);

    return new ResponseSuccess('Success', user);
  }
}
