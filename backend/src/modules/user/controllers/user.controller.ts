import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../../authentication/guards/auth.guard';
import { Public } from 'src/modules/authentication/decorators/public.decorator';
import { ResponseSuccess } from 'src/modules/common/response';

@Public()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getHello(): Promise<ResponseSuccess> {
    const users = await this.userService.getHello();
    return new ResponseSuccess('Success', users);
  }
}
