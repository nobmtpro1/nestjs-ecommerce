import { Controller, Get } from '@nestjs/common';
import { ResponseSuccess } from 'src/modules/common/response';
import { AddressService } from '../address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('')
  async getAddress() {
    const address = await this.addressService.getAll();
    return new ResponseSuccess('Success', address);
  }
}
