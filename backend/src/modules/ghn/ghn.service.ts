import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AddressService } from '../address/address.service';

@Injectable()
export class GHNService {
  private headers: any;
  constructor(
    private readonly configService: ConfigService,
    private readonly addressService: AddressService,
  ) {
    this.headers = {
      Token: configService.get('GHN').TOKEN,
    };
  }

  async syncAddress() {
    const config = this.configService.get('GHN');
    await axios
      .get(`${config.URL}/shiip/public-api/master-data/province`, {
        headers: this.headers,
      })
      .then(async (res) => {
        const result = await this.addressService.bulkUpdateOrCreateProvince(
          res.data.data.map((e) => ({
            id: e.ProvinceID,
            provinceName: e.ProvinceName,
            provinceCode: e.Code,
          })),
        );
        console.log(result);
      });
    await axios
      .get(`${config.URL}/shiip/public-api/master-data/district`, {
        headers: this.headers,
      })
      .then(async (res) => {
        const result = await this.addressService.bulkUpdateOrCreateDistrict(
          res.data.data
            .filter((e) => e.Code)
            .map((e) => ({
              id: e.DistrictID,
              districtName: e.DistrictName,
              districtCode: e.Code,
              provinceId: e.ProvinceID,
            })),
        );
        console.log(result);
      });
  }
}
