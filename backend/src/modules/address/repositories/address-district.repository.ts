import { Injectable } from '@nestjs/common';
import { AddressDistrict } from 'src/modules/address/entities/address-district.entity';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class AddressDistrictRepository extends BaseRepository<AddressDistrict> {
  constructor(private dataSource: DataSource) {
    super(AddressDistrict, dataSource.createEntityManager());
  }
}
