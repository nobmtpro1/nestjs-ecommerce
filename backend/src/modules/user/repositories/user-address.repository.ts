import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';
import { DataSource } from 'typeorm';
import { UserAddress } from '../entities/user-address.entity';

@Injectable()
export class UserAddressRepository extends BaseRepository<UserAddress> {
  constructor(private dataSource: DataSource) {
    super(UserAddress, dataSource.createEntityManager());
  }
}
