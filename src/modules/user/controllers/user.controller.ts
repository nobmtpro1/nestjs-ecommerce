import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../../auth/auth.guard';
import { Public } from 'src/commons/decorators';

@Public()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getHello(): Promise<string> {
    return await this.userService.getHello();
  }
}
