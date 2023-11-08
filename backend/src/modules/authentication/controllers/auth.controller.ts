import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../../../guards/auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { ResponseSuccess } from 'src/commons/response';

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
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  getProfile(@Request() req) {
    return new ResponseSuccess('Success', req.user);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string; token: string }) {
    const access_token = await this.authService.refreshToken(
      body?.refreshToken,
      body?.token,
    );
    return access_token;
  }
}