import { AuditEntity } from '../../common/entities/audit.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { UserAddress } from '../../user/entities/user-address.entity';
import { CheckoutCartItem } from './checkout-cart-item.entity';
import { Discount } from '../../discount/entities/discount.entity';
import { CheckoutOrder } from './checkout-order.entity';

@Entity({ name: 'checkout_cart' })
export class CheckoutCart extends AuditEntity {
  @ManyToOne(() => User, (user) => user.carts, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => UserAddress, (address) => address.carts, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'shipping_address_id' })
  shippingAddress: UserAddress;

  @Column('varchar', { name: 'note', length: 255, nullable: true })
  note: string;

  @Column('varchar', { name: 'email', length: 255, nullable: true })
  email: string;

  @Column('timestamp', { name: 'invoice_sent_at', nullable: true })
  invoiceSentAt: Date;

  @Column('varchar', { name: 'invoice_url', length: 255, nullable: true })
  invoiceUrl: string;

  @Column('timestamp', { name: 'completed_at', nullable: true })
  completedAt: Date;

  @Column('bigint', { name: 'shipping_price', default: 0 })
  shippingPrice: number;

  @Column('bigint', { name: 'discount_price', default: 0 })
  discountPrice: number;

  @Column('bigint', { name: 'subtotal', default: 0 })
  subtotal: number;

  @Column('bigint', { name: 'total', default: 0 })
  total: number;

  @Column('simple-array', { name: 'tags', nullable: true })
  tags: string[];

  @OneToMany(() => CheckoutCartItem, (item) => item.cart, {
    eager: true,
  })
  items: CheckoutCartItem[];

  @ManyToOne(() => Discount, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'discount_id' })
  discount: Discount;

  @OneToOne(() => CheckoutOrder, (order) => order.cart)
  order: CheckoutOrder;
}
