import { Injectable } from '@nestjs/common';
import { UserToken } from 'src/modules/user/entities/user-token.entity';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class UserTokenRepository extends BaseRepository<UserToken> {
  constructor(private dataSource: DataSource) {
    super(UserToken, dataSource.createEntityManager());
  }
}
