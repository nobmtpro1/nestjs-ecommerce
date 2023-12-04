import { Injectable } from '@nestjs/common';
import { CheckoutCart } from '../entities/checkout-cart.entity';
import { UserAddressService } from 'src/modules/user/services/user-address.service';
import { PaymentEnum } from '../enums/order.enum';
import { ShippingAddressDto } from '../dtos/checkout-order.dto';
import { CheckoutOrder } from '../entities/checkout-order.entity';
import { CheckoutOrderRepository } from '../repositories/checkout-order.repository';
import { LessThan } from 'typeorm';

@Injectable()
export class CheckoutOrderService {
  constructor(
    private checkoutOrderRepository: CheckoutOrderRepository,
    private userAddressService: UserAddressService,
  ) {}

  async getOrderByUuid(uuid: string) {
    const order = await this.checkoutOrderRepository.findOne({
      where: {
        uuid,
      },
    });

    return order;
  }

  async createOrder(
    manager,
    cart: CheckoutCart,
    shippingAddress: ShippingAddressDto,
    payment: PaymentEnum,
  ) {
    let order = new CheckoutOrder();
    order.user = cart.user;
    order.cart = cart;
    order.subtotal = cart.subtotal;
    order.discountPrice = cart.discountPrice;
    order.shippingPrice = cart.shippingPrice;
    order.total = cart.total;
    order.email = cart.email || shippingAddress.email;
    order.note = cart.note;

    let totalWeight = 0;
    for (const item of cart.items) {
      let variant = item.variant;
      if (!variant) {
        variant = await item.variant;
      }
      totalWeight += variant.weight || 0;
    }
    order.totalWeight = totalWeight;
    order.shippingAddress =
      await this.userAddressService.createInstanceFromPlain(shippingAddress);
    order.payment = payment;
    order.tags = cart.tags;
    order.items = cart.items;
    await manager.save(order);
    return order;
    // return await this.checkoutOrderRepository.save(order, { reload: true });
  }
}
