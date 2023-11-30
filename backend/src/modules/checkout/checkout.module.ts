import { Module } from '@nestjs/common';
import { CheckoutCartRepository } from './repositories/checkout-cart.repository';
import { CheckoutCartService } from './services/checkout-cart.service';
import { CheckoutCartController } from './controllers/checkout-cart.controller';
import { UserModule } from '../user/user.module';
import { CheckoutCartItemRepository } from './repositories/checkout-cart-item.repository';
import { ProductModule } from '../product/product.module';
import { CheckoutOrderService } from './services/checkout-order.service';
import { CheckoutOrderRepository } from './repositories/checkout-order.repository';
import { CheckoutOrderController } from './controllers/checkout-order.controller';

@Module({
  imports: [UserModule, ProductModule],
  controllers: [CheckoutCartController, CheckoutOrderController],
  providers: [
    CheckoutCartRepository,
    CheckoutCartItemRepository,
    CheckoutOrderRepository,
    CheckoutCartService,
    CheckoutOrderService,
  ],
  exports: [
    CheckoutCartRepository,
    CheckoutCartItemRepository,
    CheckoutOrderRepository,
    CheckoutCartService,
    CheckoutOrderService,
  ],
})
export class CheckoutModule {}
