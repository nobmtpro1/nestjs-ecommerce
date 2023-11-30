import { Controller, Get, Param } from '@nestjs/common';
import { CheckoutCartService } from '../services/checkout-cart.service';
import { ResponseSuccess } from 'src/modules/common/response';
import { CheckoutOrderService } from '../services/checkout-order.service';

@Controller('checkout/order')
export class CheckoutOrderController {
  constructor(private readonly checkoutOrderService: CheckoutOrderService) {}

  @Get(':uuid')
  async getOrder(@Param() { uuid }: { uuid: string }) {
    const order = await this.checkoutOrderService.getOrderByUuid(uuid);
    return new ResponseSuccess('Success', order);
  }
}
