import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
