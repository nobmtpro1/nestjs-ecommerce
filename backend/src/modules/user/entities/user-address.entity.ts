import { AuditEntity } from '../../common/entities/audit.entity';
import {
  Entity,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { AddressProvince } from '../../address/entities/address-province.entity';
import { AddressDistrict } from '../../address/entities/address-district.entity';
import { CheckoutCart } from '../../checkout/entities/checkout-cart.entity';

@Entity({ name: 'user_address' })
export class UserAddress extends AuditEntity {
  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'phone', length: 255 })
  phone: string;

  @Column('varchar', { name: 'address', length: 255 })
  address: string;

  @Column('varchar', { name: 'province_code', length: 255 })
  provinceCode: string;

  @ManyToOne((type) => AddressProvince, { eager: true })
  @JoinColumn({ name: 'province_code', referencedColumnName: 'provinceCode' })
  province: AddressProvince;

  @Column('varchar', { name: 'district_code', length: 255 })
  districtCode: string;

  @ManyToOne((type) => AddressDistrict, { eager: true })
  @JoinColumn({ name: 'district_code', referencedColumnName: 'districtCode' })
  district: AddressDistrict;

  @Column('boolean', { name: 'default', default: false })
  default: boolean;

  @OneToMany(() => CheckoutCart, (cart) => cart.shippingAddress, {
    lazy: true,
  })
  carts: CheckoutCart[];
}
