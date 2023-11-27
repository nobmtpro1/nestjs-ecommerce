import { AuditEntity } from '../../common/entities/audit.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'product_tag' })
export class ProductTag extends AuditEntity {
  @Column('varchar', { name: 'name', length: 255, unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.tags)
  products: Product[];
}
