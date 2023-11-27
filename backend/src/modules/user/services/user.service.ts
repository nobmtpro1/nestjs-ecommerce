import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UserToken } from 'src/modules/user/entities/user-token.entity';
import { UserTokenRepository } from '../repositories/user-token.repository';
import { Role } from 'src/modules/authorization/enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userTokenRepository: UserTokenRepository,
  ) {}

  async getHello() {
    const users = await this.userRepository.getAll();
    return users;
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateOrCreateUserOauth(email: string, name: string, avatar: string) {
    let user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      user = new User();
    }
    user.email = email;
    user.name = name;
    user.avatar = avatar;
    user.verifiedEmail = true;
    user.roles = [Role.USER];
    return await this.userRepository.save(user, { reload: true });
  }

  async createToken(user: User, accessToken: string, refreshToken: string) {
    let token = await user.token;
    if (!token) {
      token = new UserToken();
    }
    token.accessToken = accessToken;
    token.refreshToken = refreshToken;
    await token.save();
    user.token = token;
    await user.save();
    return token;
  }

  async findToken(accessToken: string, refreshToken: string) {
    let token = await this.userTokenRepository.findOne({
      where: {
        accessToken,
        refreshToken,
      },
      relations: {
        user: true,
      },
    });
    return token;
  }
}
