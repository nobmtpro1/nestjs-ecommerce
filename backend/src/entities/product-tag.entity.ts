import { AuditEntity } from 'src/entities/audit.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductTag extends AuditEntity {
  @Column('varchar', { length: 255, unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.tags)
  products: Product[];
}
