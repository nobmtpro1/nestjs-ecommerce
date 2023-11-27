import { Module } from '@nestjs/common';
import { CheckoutCartRepository } from './repositories/checkout-cart.repository';
import { CheckoutCartService } from './services/checkout-cart.service';
import { CheckoutCartController } from './controllers/checkout-cart.controller';
import { UserModule } from '../user/user.module';
import { CheckoutCartItemRepository } from './repositories/checkout-cart-item.repository';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [UserModule, ProductModule],
  controllers: [CheckoutCartController],
  providers: [
    CheckoutCartRepository,
    CheckoutCartItemRepository,
    CheckoutCartService,
  ],
  exports: [
    CheckoutCartRepository,
    CheckoutCartItemRepository,
    CheckoutCartService,
  ],
})
export class CheckoutModule {}
