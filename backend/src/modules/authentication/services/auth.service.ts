import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../../common/helpers';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.validateUser(email, pass);
    const payload = { id: user.id, email: user.email };
    const userToken = await this.createToken(user, payload);
    return {
      ...payload,
      access_token: userToken.accessToken,
      refresh_token: userToken.refreshToken,
    };
  }

  async refreshToken(refreshToken: string, token: string): Promise<any> {
    try {
      const userToken = await this.userService.findToken(token, refreshToken);
      if (!userToken) {
        console.log('dont have userToken');
        return false;
      }
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
        const userTokenCreated = await this.createToken(
          await userToken.user,
          payload,
        );
        console.log('userTokenCreated');
        return {
          ...payload,
          access_token: userTokenCreated.accessToken,
          refresh_token: userTokenCreated.refreshToken,
        };
      }
      console.log('payloadToken?.id == payloadRefreshToken?.id');
      return false;
    } catch (error) {
      console.log('error', error.message);
      return false;
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new HttpException('Wrong email or password', 400);
    }
    if (!(await comparePassword(pass, user?.password))) {
      throw new HttpException('Wrong email or password', 400);
    }
    return user;
  }

  async createToken(user: User, payload): Promise<any> {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('auth.JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get(
        'auth.JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      ),
    });
    const userToken = await this.userService.createToken(
      user,
      access_token,
      refresh_token,
    );
    return userToken;
  }
}
