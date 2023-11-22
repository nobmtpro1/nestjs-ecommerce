import { AuditEntity } from './audit.entity';
import {
  Entity,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { AddressProvince } from './address-province.entity';
import { AddressWard } from './address-ward.entity';

@Entity({ name: 'address_district' })
export class AddressDistrict extends AuditEntity {
  @Column('varchar', { name: 'district_code', length: 255, unique: true })
  districtCode: string;

  @Column('varchar', { name: 'district_name', length: 255 })
  districtName: string;

  @Column('varchar', { name: 'province_code', length: 255 })
  provinceCode: string;

  @ManyToOne((type) => AddressProvince, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'province_code', referencedColumnName: 'provinceCode' })
  province: AddressProvince;

  @OneToMany(() => AddressWard, (ward) => ward.district)
  wards: AddressWard[];
}
