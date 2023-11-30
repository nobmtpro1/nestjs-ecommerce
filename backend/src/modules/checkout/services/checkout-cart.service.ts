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
import { CheckoutOrderService } from './checkout-order.service';
import { PlaceOrderDto } from '../dtos/checkout-order.dto';

@Injectable()
export class CheckoutCartService {
  constructor(
    private checkoutCartRepository: CheckoutCartRepository,
    private checkoutCartItemRepository: CheckoutCartItemRepository,
    private productVariantService: ProductVariantService,
    private userService: UserService,
    private userAddressService: UserAddressService,
    private checkoutOrderService: CheckoutOrderService,
  ) {}

  async getCart(user: User, cartId: number) {
    if (user) {
      user = await this.userService.findById(user.id);
    }
    let cart = await this.findCart(user, cartId);
    if (!cart) {
      return null;
    }
    return await this.prepareCart(cart);
  }

  async updateCart(user: User, cartId: number, body: UpdateCartDto) {
    const { items } = body;
    if (user) {
      user = await this.userService.findById(user.id);
    }

    let cart = await this.findCart(user, cartId);

    if (!cart) {
      cart = new CheckoutCart();
    }

    if (user) {
      cart = await this.updateUserInfoToCart(cart, user);
    }

    if (items) {
      const oldItems = await cart.items;
      if (oldItems) {
        await this.checkoutCartItemRepository.remove(await cart.items);
      }
      cart.items = await this.createCartItems(items);
    }

    cart = await this.checkoutCartRepository.save(cart, { reload: true });
    return await this.prepareCart(cart);
  }

  async prepareCart(cart: CheckoutCart) {
    cart = await this.calculateSubtotal(cart);
    cart = await this.calculateShippingPrice(cart);
    cart = await this.calculateTotal(cart);
    return await this.checkoutCartRepository.save(cart, { reload: true });
  }

  async findCart(user: User, cartId: number) {
    let cart = null;
    if (user) {
      cart = await this.getCartByUser(user);
    } else if (cartId) {
      cart = await this.getCartById(cartId);
      if (await cart.user) {
        cart = null;
      }
    }
    if (cart && cart.completedAt) {
      cart = null;
    }
    return cart;
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

  async calculateDiscountPrice(cart: CheckoutCart) {
    let discountPrice = 0;
    cart.discountPrice = discountPrice;
    return cart;
  }

  async calculateTotal(cart: CheckoutCart) {
    let total = 0;
    total = cart.subtotal + cart.shippingPrice - cart.discountPrice;
    cart.total = total;
    return cart;
  }

  async placeOrder(user: User, cartId: number, body: PlaceOrderDto) {
    const { shippingAddress, payment } = body;
    if (user) {
      user = await this.userService.findById(user.id);
      await this.userAddressService.updateOrCreate(user, shippingAddress);
    }

    let cart = await this.findCart(user, cartId);

    if (!cart) {
      throw new NotFoundException();
    }

    cart = await this.prepareCart(cart);
    const order = await this.checkoutOrderService.createOrder(
      cart,
      shippingAddress,
      payment,
    );
    if (order) {
      cart.completedAt = new Date();
      cart.save();
      return order;
    }
    return null;
  }
}
