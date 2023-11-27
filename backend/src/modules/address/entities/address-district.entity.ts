import { AuditEntity } from '../../common/entities/audit.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AddressProvince } from './address-province.entity';

@Entity({ name: 'address_district' })
export class AddressDistrict extends AuditEntity {
  @Column('varchar', { name: 'district_code', length: 255, unique: true })
  districtCode: string;

  @Column('varchar', { name: 'district_name', length: 255 })
  districtName: string;

  @Column('bigint', { name: 'province_id' })
  provinceId: number;

  @ManyToOne((type) => AddressProvince, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'province_id' })
  province: AddressProvince;
}
