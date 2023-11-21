import { AuditEntity } from './audit.entity';
import { Entity, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { AddressProvince } from './address-province.entity';

@Entity({ name: 'user_address' })
export class UserAddress extends AuditEntity {
  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'address', length: 255 })
  address: string;

  @Column('varchar', { name: 'province_code', length: 255 })
  provinceCode: string;

  @ManyToOne((type) => AddressProvince, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'province_code', referencedColumnName: 'provinceCode' })
  province: AddressProvince;
}
