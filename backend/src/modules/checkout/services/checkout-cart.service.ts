import { Injectable } from '@nestjs/common';
import { CheckoutCartRepository } from '../repositories/checkout-cart.repository';
import { UserService } from 'src/modules/user/services/user.service';
import { CheckoutCart } from '../entities/checkout-cart.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { CheckoutCartItem } from '../entities/checkout-cart-item.entity';
import { CheckoutCartItemRepository } from '../repositories/checkout-cart-item.repository';
import { ProductVariantService } from 'src/modules/product/services/product-variant.service';
import { UserAddressService } from 'src/modules/user/services/user-address.service';

@Injectable()
export class CheckoutCartService {
  constructor(
    private checkoutCartRepository: CheckoutCartRepository,
    private checkoutCartItemRepository: CheckoutCartItemRepository,
    private productVariantService: ProductVariantService,
    private userService: UserService,
    private userAddressService: UserAddressService,
  ) {}

  async getCart(user: User, cartId: number) {
    let cart = null;
    if (user) {
      cart = await this.getCartByUser(user);
    } else if (cartId) {
      cart = await this.getCartById(cartId);
    }
    if (!cart) {
      return null;
    }

    cart = await this.calculatePrice(cart);

    return await this.checkoutCartRepository.save(cart, { reload: true });
  }

  async updateCart(user: User, cartId: number, body) {
    const { items } = body;
    if (user) {
      user = await this.userService.findById(user.id);
    }

    let cart = null;
    if (user) {
      cart = await this.getCartByUser(user);
    } else if (cartId) {
      cart = await this.getCartById(cartId);
    }

    if (!cart) {
      cart = new CheckoutCart();
    }

    if (user) {
      cart = await this.updateUserInfoToCart(cart, user);
    }

    if (items) {
      await this.checkoutCartItemRepository.remove(await cart.items);
      cart.items = await this.createCartItems(items);
    }

    await this.checkoutCartRepository.save(cart, { reload: true });
    return await this.getCart(user, cartId);
  }

  async getCartByUser(user: User) {
    const cart = await this.checkoutCartRepository.findOne({
      where: {
        user: { id: user.id },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        items: true,
        user: true,
        shippingAddress: true,
        discount: true,
      },
    });
    return cart;
  }

  async getCartById(id: number) {
    const cart = await this.checkoutCartRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        items: true,
        user: true,
        shippingAddress: true,
        discount: true,
      },
    });
    return cart;
  }

  async createCartItem(item) {
    let cartItem = new CheckoutCartItem();
    const variant = await this.productVariantService.findById(item.variantId);
    console.log('variant', variant);
    if (!variant) {
      return null;
    }
    cartItem.variant = variant;
    cartItem.product = variant.product;
    cartItem.quantity = item.quantity;
    return await this.checkoutCartItemRepository.save(cartItem, {
      reload: true,
    });
  }

  async createCartItems(items) {
    const cartItems = [];
    for (const item of items) {
      const obj = await this.createCartItem(item);
      if (!obj) {
        continue;
      }
      cartItems.push(obj);
    }
    return cartItems;
  }

  async getCartItemByVariantId(cartId: number, variantId: number) {
    const cartItem = await this.checkoutCartItemRepository.findOne({
      where: {
        variant: { id: variantId },
        cart: { id: cartId },
      },
      relations: {
        product: true,
        variant: true,
        discount: true,
      },
    });
    return cartItem;
  }

  async updateUserInfoToCart(cart: CheckoutCart, user: User) {
    cart.user = user;
    cart.email = user.email;
    const defaultUserAddress =
      await this.userAddressService.getDefaultAddressByUser(user);
    if (defaultUserAddress && !cart.shippingAddress) {
      cart.shippingAddress = defaultUserAddress;
    }
    return cart;
  }

  async calculateSubtotal(cart: CheckoutCart) {
    const cartItems = cart.items;
    let subtotal = 0;
    for (const cartItem of cartItems) {
      subtotal += cartItem.variant.price * cartItem.quantity;
    }
    cart.subtotal = subtotal;
    return cart;
  }

  async calculateShippingPrice(cart: CheckoutCart) {
    let shippingPrice = 0;
    cart.shippingPrice = shippingPrice;
    return cart;
  }

  async calculateTotal(cart: CheckoutCart) {
    let total = 0;
    total = cart.subtotal + cart.shippingPrice;
    cart.total = total;
    return cart;
  }

  async calculatePrice(cart: CheckoutCart) {
    cart = await this.calculateSubtotal(cart);
    cart = await this.calculateShippingPrice(cart);
    cart = await this.calculateTotal(cart);
    return cart;
  }
}
