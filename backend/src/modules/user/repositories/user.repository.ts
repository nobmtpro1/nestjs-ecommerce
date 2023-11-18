import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../commons/repositories/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
