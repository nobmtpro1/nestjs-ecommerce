import { AuditEntity } from '../../common/entities/audit.entity';
import { Entity, Column, OneToMany } from 'typeorm';
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
