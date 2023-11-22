import { Injectable } from '@nestjs/common';
import { AddressProvince } from 'src/entities/address-province.entity';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class AddressProvinceRepository extends BaseRepository<AddressProvince> {
  constructor(private dataSource: DataSource) {
    super(AddressProvince, dataSource.createEntityManager());
  }
}
