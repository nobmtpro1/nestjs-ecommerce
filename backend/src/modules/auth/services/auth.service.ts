import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/commons/helpers';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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
    };
  }
}
