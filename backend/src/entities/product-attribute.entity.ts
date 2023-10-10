import { AuditEntity } from 'src/entities/audit.entity';
import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { ProductAttributeValue } from './product-attribute-value.entity';

@Entity()
export class ProductAttribute extends AuditEntity {
  @Column('varchar', { length: 255, unique: true })
  name: string;

  @OneToMany(
    () => ProductAttributeValue,
    (productAttributeValue) => productAttributeValue.productAttribute,
  )
  productAttributeValues: ProductAttributeValue[];

  @ManyToMany(() => Product, (product) => product.attributes)
  products: Product[];
}
