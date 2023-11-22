import { Module } from '@nestjs/common';
import { AddressProvinceRepository } from './repositories/address-province.repository';
import { AddressDistrictRepository } from './repositories/address-district.repository';
import { AddressService } from './address.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    AddressProvinceRepository,
    AddressDistrictRepository,
    AddressService,
  ],
  exports: [
    AddressProvinceRepository,
    AddressDistrictRepository,
    AddressService,
  ],
})
export class AddressModule {}
