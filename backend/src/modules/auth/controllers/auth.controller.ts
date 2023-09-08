import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../auth.guard';
import { Public } from 'src/commons/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: Record<string, any>) {
    return this.authService.signIn(body.email, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: { refresh_token: string }) {
    const access_token = await this.authService.refreshToken(
      body?.refresh_token,
    );
    return access_token;
  }
}
