import { AuditEntity } from '../../common/entities/audit.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CheckoutCart } from './checkout-cart.entity';
import {
  FinancialStatusEnum,
  FulfillmentStatusEnum,
  PaymentEnum,
} from '../enums/order.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { UserAddress } from 'src/modules/user/entities/user-address.entity';
import { Discount } from 'src/modules/discount/entities/discount.entity';
import {
  OrderDiscountInterface,
  OrderItemInterface,
  OrderShippingAddressInterface,
} from '../interfaces/order.interfaces';

@Entity({ name: 'checkout_order' })
export class CheckoutOrder extends AuditEntity {
  @Column('varchar', { name: 'cancel_reason', length: 255, nullable: true })
  cancelReason: string;

  @Column('timestamp', { name: 'canceled_at', nullable: true })
  canceledAt: Date;

  @Column('bigint', { name: 'cart_id', nullable: true })
  cartId: number;

  @OneToOne(() => CheckoutCart, (cart) => cart.order)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'cartId' })
  cart: CheckoutCart;

  @Column('timestamp', { name: 'closed_at', nullable: true })
  closedAt: Date;

  @Column('int', { name: 'confirmed', default: false })
  confirmed: boolean;

  @Column('varchar', { name: 'email', nullable: true })
  email: string;

  @Column('bigint', { name: 'subtotal', default: 0 })
  subtotal: number;

  @Column('bigint', { name: 'shipping_price', default: 0 })
  shippingPrice: number;

  @Column('bigint', { name: 'discount_price', default: 0 })
  discountPrice: number;

  @Column('bigint', { name: 'total', default: 0 })
  total: number;

  @Column('varchar', {
    name: 'financial_status',
    default: FinancialStatusEnum.PENDING,
  })
  financialStatus: FinancialStatusEnum;

  @Column('varchar', {
    name: 'fulfillment_status',
    default: FulfillmentStatusEnum.NULL,
  })
  fulfillmentStatus: FulfillmentStatusEnum;

  @Column('varchar', { name: 'note', nullable: true })
  note: string;

  @Column('varchar', { name: 'order_status_url', nullable: true })
  orderStatusUrl: string;

  @Column('int', { name: 'total_weight', default: 0 })
  totalWeight: number;

  @ManyToOne(() => User, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('simple-json', { nullable: true })
  shippingAddress: OrderShippingAddressInterface;

  @Column('simple-json', { nullable: true })
  appliedDiscount: OrderDiscountInterface;

  @Column('varchar', {
    name: 'payment',
    nullable: true,
  })
  payment: PaymentEnum;

  @Column('simple-json', { nullable: true })
  items: OrderItemInterface[];
}
