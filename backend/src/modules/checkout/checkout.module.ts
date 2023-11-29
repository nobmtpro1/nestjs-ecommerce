import { Module } from '@nestjs/common';
import { CheckoutCartRepository } from './repositories/checkout-cart.repository';
import { CheckoutCartService } from './services/checkout-cart.service';
import { CheckoutCartController } from './controllers/checkout-cart.controller';
import { UserModule } from '../user/user.module';
import { CheckoutCartItemRepository } from './repositories/checkout-cart-item.repository';
import { ProductModule } from '../product/product.module';
import { CheckoutOrderService } from './services/checkout-order.service';

@Module({
  imports: [UserModule, ProductModule],
  controllers: [CheckoutCartController],
  providers: [
    CheckoutCartRepository,
    CheckoutCartItemRepository,
    CheckoutCartService,
    CheckoutOrderService,
  ],
  exports: [
    CheckoutCartRepository,
    CheckoutCartItemRepository,
    CheckoutCartService,
    CheckoutOrderService,
  ],
})
export class CheckoutModule {}
