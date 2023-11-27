import { Injectable } from '@nestjs/common';
import { CheckoutCartRepository } from '../repositories/checkout-cart.repository';
import { UserService } from 'src/modules/user/services/user.service';
import { CheckoutCart } from '../entities/checkout-cart.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { CheckoutCartItem } from '../entities/checkout-cart-item.entity';
import { CheckoutCartItemRepository } from '../repositories/checkout-cart-item.repository';
import { ProductVariant } from 'src/modules/product/entities/product-variant.entity';
import { ProductVariantService } from 'src/modules/product/services/product-variant.service';

@Injectable()
export class CheckoutCartService {
  constructor(
    private checkoutCartRepository: CheckoutCartRepository,
    private checkoutCartItemRepository: CheckoutCartItemRepository,
    private productVariantService: ProductVariantService,
    private userService: UserService,
  ) {}

  async updateCart(user, cartId: number, body) {
    const { items } = body;
    if (user) {
      user = await this.userService.findById(user.id);
    }

    let cart = new CheckoutCart();
    if (user) {
      const userCart = await this.getCartByUser(user);
      if (userCart) {
        cart = userCart;
      }
    } else if (cartId) {
      const existCart = await this.getCartById(cartId);
      if (existCart) {
        cart = existCart;
      }
    }

    if (user) {
      cart.user = user;
    }

    if (items) {
      const cartItems = [];
      for (const item of items) {
        const obj = await this.updateOrCreateCartItem(cart, item);
        if (!obj) {
          continue;
        }
        cartItems.push(obj);
      }
      cart.items = cartItems;
    }

    return await cart.save();
  }

  async getCartByUser(user: User) {
    const cart = await this.checkoutCartRepository.findOne({
      where: {
        user: { id: user.id },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return cart;
  }

  async getCartById(id: number) {
    const cart = await this.checkoutCartRepository.findOne({
      where: {
        id: id,
      },
    });
    return cart;
  }

  async updateOrCreateCartItem(cart, item) {
    let cartItem = new CheckoutCartItem();
    const existCartItem = await this.getCartItemByVariantId(
      cart.id,
      item?.variantId,
    );
    if (existCartItem) {
      cartItem = existCartItem;
    }

    const variant = await this.productVariantService.findById(item.variantId);
    if (!variant) {
      if (existCartItem) {
        await existCartItem.remove();
      }
      return null;
    }
    cartItem.variant = variant;
    cartItem.product = variant.product;
    cartItem.quantity = item.quantity;
    await cartItem.save();
    return cartItem;
  }

  async getCartItemByVariantId(cartId, variantId: number) {
    const cartItem = await this.checkoutCartItemRepository.findOne({
      where: {
        variant: { id: variantId },
        cart: { id: cartId },
      },
    });
    return cartItem;
  }
}
