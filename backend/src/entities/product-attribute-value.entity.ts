import { AuditEntity } from 'src/entities/audit.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ProductAttribute } from './product-attribute.entity';
import { Image } from './image.entity';
import { Product } from './product.entity';
import { ProductVariant } from './product-variant.entity';

@Entity()
export class ProductAttributeValue extends AuditEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @Column('longtext')
  description: string;

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image;

  @ManyToOne(
    () => ProductAttribute,
    (productAttribute) => productAttribute.productAttributeValues,
  )
  productAttribute: ProductAttribute;

  @ManyToMany(() => Product, (product) => product.attributeValues)
  products: Product[];
}
