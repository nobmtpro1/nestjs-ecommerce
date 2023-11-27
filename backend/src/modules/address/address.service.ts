import { Injectable } from '@nestjs/common';
import { AddressProvinceRepository } from './repositories/address-province.repository';
import { AddressDistrictRepository } from './repositories/address-district.repository';
import { AddressProvince } from 'src/modules/address/entities/address-province.entity';
import { AddressDistrict } from 'src/modules/address/entities/address-district.entity';

@Injectable()
export class AddressService {
  constructor(
    private readonly addressProvinceRepository: AddressProvinceRepository,
    private readonly addressDistrictRepository: AddressDistrictRepository,
  ) {}

  async bulkUpdateOrCreateProvince(
    data: {
      id: number;
      provinceName: string;
      provinceCode: string;
    }[],
  ) {
    try {
      await this.addressProvinceRepository.manager
        .createQueryBuilder()
        .insert()
        .into(AddressProvince)
        .values(data)
        .orUpdate(['province_name', 'province_code'], ['id'], {
          skipUpdateIfNoValuesChanged: true,
        })
        .execute();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        errorMessage: error.message,
      };
    }
  }

  async bulkUpdateOrCreateDistrict(
    data: {
      id: number;
      districtName: string;
      districtCode: string;
      provinceId: number;
    }[],
  ) {
    try {
      console.log(data.map((e) => e.districtCode));
      await this.addressDistrictRepository.manager
        .createQueryBuilder()
        .insert()
        .into(AddressDistrict)
        .values(data)
        .orUpdate(['district_name', 'district_code'], ['id'], {
          skipUpdateIfNoValuesChanged: true,
        })
        .execute();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        errorMessage: error.message,
      };
    }
  }
}
