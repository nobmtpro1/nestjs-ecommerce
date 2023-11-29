import { Module } from '@nestjs/common';
import { AddressProvinceRepository } from './repositories/address-province.repository';
import { AddressDistrictRepository } from './repositories/address-district.repository';
import { AddressService } from './address.service';
import { AddressController } from './controllers/address.controller';

@Module({
  imports: [],
  controllers: [AddressController],
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
