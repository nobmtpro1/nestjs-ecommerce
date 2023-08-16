import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getHello(): Promise<string> {
    const users = await this.userRepository.all();
    console.log(users);
    return 'Hello World! User 23';
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
