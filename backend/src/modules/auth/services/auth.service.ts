import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/commons/helpers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new HttpException('Wrong email or password', 400);
    }
    if (!(await comparePassword(pass, user?.password))) {
      throw new HttpException('Wrong email or password', 400);
    }
    const payload = { id: user.id, email: user.email };
    return {
      ...payload,
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('auth.JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get(
          'auth.JWT_REFRESH_TOKEN_EXPIRATION_TIME',
        ),
      }),
    };
  }

  async refreshToken(refreshToken: string, token: string): Promise<any> {
    try {
      const payloadToken = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('auth.JWT_ACCESS_TOKEN_SECRET'),
        ignoreExpiration: true,
      });

      const payloadRefreshToken = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.get('auth.JWT_REFRESH_TOKEN_SECRET'),
        },
      );

      if (payloadToken?.id == payloadRefreshToken?.id) {
        const payload = {
          id: payloadRefreshToken.id,
          email: payloadRefreshToken.email,
        };
        return {
          ...payload,
          access_token: await this.jwtService.signAsync(payload),
          refresh_token: refreshToken,
        };
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
