import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { Public } from 'src/modules/authentication/decorators/public.decorator';
import { ResponseSuccess } from 'src/modules/common/response';
import { AuthLoginDto } from 'src/modules/authentication/dtos/auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GoogleOAuthGuard } from '../guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: AuthLoginDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  getProfile(@Request() req) {
    return new ResponseSuccess('Success', req.user);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: { refresh_token: string; access_token: string },
  ) {
    const access_token = await this.authService.refreshToken(
      body?.refresh_token,
      body?.access_token,
    );
    if (!access_token) {
      throw new UnauthorizedException();
    }
    return access_token;
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google-callback')
  @UseGuards(GoogleOAuthGuard)
  googleAuthCallback(@Request() req) {
    return this.authService.googleLogin(req);
  }
}
