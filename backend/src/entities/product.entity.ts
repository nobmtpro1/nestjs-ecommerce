import { ProductType } from 'src/commons/enums/product-type.enum';
import { AuditEntity } from 'src/entities/audit.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Product extends AuditEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  image: string;

  @Column('varchar', { length: 1000 })
  shortDescription: string;

  @Column('longtext')
  description: string;

  @Column('int', { default: ProductType.SIMPLE })
  type: ProductType;
}
