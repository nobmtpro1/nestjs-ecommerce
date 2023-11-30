import { Injectable } from '@nestjs/common';
import { UserAddressRepository } from '../repositories/user-address.repository';
import { User } from '../entities/user.entity';
import { ShippingAddressDto } from 'src/modules/checkout/dtos/checkout-order.dto';
import { UserAddress } from '../entities/user-address.entity';
import { plainToInstance } from 'class-transformer';
import { AddressService } from 'src/modules/address/address.service';

@Injectable()
export class UserAddressService {
  constructor(
    private userAddressRepository: UserAddressRepository,
    private addressService: AddressService,
  ) {}

  async getDefaultAddressByUser(user: User) {
    const address = await this.userAddressRepository.findOne({
      where: {
        user: { id: user.id },
      },
    });
    return address;
  }

  async updateOrCreate(user: User, addressData: ShippingAddressDto) {
    let address = await this.getDefaultAddressByUser(user);
    if (!address) {
      address = new UserAddress();
      address.user = user;
    }
    address.name = addressData.name;
    address.phone = addressData.phone;
    address.address = addressData.address;
    address.provinceCode = addressData.provinceCode;
    address.districtCode = addressData.districtCode;
    return await this.userAddressRepository.save(address, { reload: true });
  }

  async createInstanceFromPlain(addressData: ShippingAddressDto) {
    let address = plainToInstance(UserAddress, addressData);
    address.province = await this.addressService.findProvinceByCode(
      address.provinceCode,
    );
    address.district = await this.addressService.findDistrictByCode(
      address.districtCode,
    );
    return address;
  }
}
