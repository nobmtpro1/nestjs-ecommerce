import { AuditEntity } from './audit.entity';
import { Entity, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { AddressProvince } from './address-province.entity';
import { AddressDistrict } from './address-district.entity';

@Entity({ name: 'address_ward' })
export class AddressWard extends AuditEntity {
  @Column('varchar', { name: 'ward_code', length: 255, unique: true })
  wardCode: string;

  @Column('varchar', { name: 'ward_name', length: 255 })
  wardName: string;

  @Column('varchar', { name: 'district_code', length: 255 })
  districtCode: string;

  @ManyToOne((type) => AddressDistrict, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'district_code', referencedColumnName: 'districtCode' })
  district: AddressDistrict;
}
