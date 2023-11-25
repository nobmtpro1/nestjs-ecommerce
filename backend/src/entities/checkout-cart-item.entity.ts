import { AuditEntity } from './audit.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CheckoutCart } from './checkout-cart.entity';
import { Product } from './product.entity';
import { ProductVariant } from './product-variant.entity';
import { Discount } from './discount.entity';

@Entity({ name: 'checkout_cart_item' })
export class CheckoutCartItem extends AuditEntity {
  @ManyToOne(() => CheckoutCart, (cart) => cart.items, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'checkout_cart_id' })
  cart: CheckoutCart;

  @ManyToOne(() => Product, {
    eager: true,
    lazy: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => ProductVariant, {
    eager: true,
    lazy: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_variant_id' })
  variant: ProductVariant;

  @Column('int', { name: 'quantity', default: 0 })
  quantity: number;

  @ManyToOne(() => Discount, {
    eager: true,
    lazy: true,
  })
  @JoinColumn({ name: 'discount_id' })
  discount: Discount;
}
