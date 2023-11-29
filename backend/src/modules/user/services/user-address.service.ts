import { Injectable } from '@nestjs/common';
import { UserAddressRepository } from '../repositories/user-address.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserAddressService {
  constructor(private userAddressRepository: UserAddressRepository) {}

  async getDefaultAddressByUser(user: User) {
    const address = await this.userAddressRepository.findOne({
      where: {
        user: { id: user.id },
      },
    });
    return address;
  }
}
