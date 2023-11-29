import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckoutCartRepository } from '../repositories/checkout-cart.repository';
import { UserService } from 'src/modules/user/services/user.service';
import { CheckoutCart } from '../entities/checkout-cart.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { CheckoutCartItem } from '../entities/checkout-cart-item.entity';
import { CheckoutCartItemRepository } from '../repositories/checkout-cart-item.repository';
import { ProductVariantService } from 'src/modules/product/services/product-variant.service';
import { UserAddressService } from 'src/modules/user/services/user-address.service';
import { UpdateCartDto } from '../dtos/checkout-cart.dto';
import { PaymentEnum } from '../enums/order.enum';

@Injectable()
export class CheckoutOrderService {
  constructor(
    private checkoutCartRepository: CheckoutCartRepository,
    private checkoutCartItemRepository: CheckoutCartItemRepository,
    private productVariantService: ProductVariantService,
    private userService: UserService,
    private userAddressService: UserAddressService,
  ) {}

  async createOrder(cart: CheckoutCart, shippingAddress, payment: PaymentEnum) {
    return {};
  }
}
