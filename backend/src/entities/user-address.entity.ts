import { AuditEntity } from './audit.entity';
import { Entity, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { AddressProvince } from './address-province.entity';
import { AddressDistrict } from './address-district.entity';
import { AddressWard } from './address-ward.entity';

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

  @ManyToOne((type) => AddressProvince, { eager: true })
  @JoinColumn({ name: 'province_code', referencedColumnName: 'provinceCode' })
  province: AddressProvince;

  @Column('varchar', { name: 'district_code', length: 255 })
  districtCode: string;

  @ManyToOne((type) => AddressDistrict, { eager: true })
  @JoinColumn({ name: 'district_code', referencedColumnName: 'districtCode' })
  district: AddressDistrict;

  @Column('varchar', { name: 'ward_code', length: 255 })
  wardCode: string;

  @ManyToOne((type) => AddressWard, { eager: true })
  @JoinColumn({ name: 'ward_code', referencedColumnName: 'wardCode' })
  ward: AddressWard;
}
