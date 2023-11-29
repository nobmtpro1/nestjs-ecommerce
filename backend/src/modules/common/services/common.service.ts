import { Injectable } from '@nestjs/common';
import { paymentOptions } from 'src/modules/checkout/enums/order.enum';

@Injectable()
export class CommonService {
  constructor() {}

  async get() {
    return {
      paymentOptions,
    };
  }
}
