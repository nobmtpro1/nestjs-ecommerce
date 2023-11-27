import { AuditEntity } from '../../common/entities/audit.entity';
import { Entity, Column } from 'typeorm';
import { DiscountValueType } from '../enums/discount.enum';

@Entity({ name: 'discount' })
export class Discount extends AuditEntity {
  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string;

  @Column('float', { name: 'value', default: 0 })
  value: number;

  @Column('varchar', { name: 'value_type', default: DiscountValueType.FIXED })
  valueType: DiscountValueType;
}
