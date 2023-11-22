import { Exclude, Expose } from 'class-transformer';
import { AuditEntity } from './audit.entity';
import {
  Entity,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { AddressDistrict } from './address-district.entity';

@Entity({ name: 'address_province' })
export class AddressProvince extends AuditEntity {
  @Column('varchar', { name: 'province_code', length: 255, unique: true })
  provinceCode: string;

  @Column('varchar', { name: 'province_name', length: 255 })
  provinceName: string;

  @OneToMany(() => AddressDistrict, (district) => district.province)
  districts: AddressDistrict[];
}
