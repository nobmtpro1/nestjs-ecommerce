import { Exclude, Expose } from 'class-transformer';
import { AuditEntity } from './audit.entity';
import { Entity, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { AddressProvince } from './address-province.entity';

@Entity({ name: 'address_district' })
export class AddressDistrict extends AuditEntity {
  @Column('varchar', { name: 'district_id', length: 255, unique: true })
  districtId: string;

  @Column('varchar', { name: 'district_name', length: 255 })
  districtName: string;

  @Column('varchar', { name: 'district_code', length: 255, unique: true })
  districtCode: string;

  @ManyToOne((type) => AddressProvince, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'province_code', referencedColumnName: 'provinceId' })
  province: AddressProvince;
}
