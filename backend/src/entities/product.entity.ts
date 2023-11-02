import { ProductType } from 'src/enums/product-type.enum';
import { AuditEntity } from 'src/entities/audit.entity';
import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Image } from './image.entity';
import { ProductStatus } from '../enums/product-status.enum';
import { ProductCategory } from './product-category.entity';
import { ProductTag } from './product-tag.entity';
import { ProductSimpleData } from './product-simple-data.entity';
import { ProductAttribute } from './product-attribute.entity';
import { ProductAttributeValue } from './product-attribute-value.entity';
import { ProductVariation } from './product-variation.entity';

@Entity()
export class Product extends AuditEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 1000 })
  shortDescription: string;

  @Column('longtext')
  description: string;

  @Column('varchar', { default: ProductType.SIMPLE })
  type: ProductType;

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image;

  @ManyToMany(() => Image)
  @JoinTable()
  gallery: Image[];

  @Column('int', { default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @Column('varchar', { length: 1000, unique: true })
  slug: string;

  @ManyToMany(() => ProductCategory, (category) => category.products)
  @JoinTable()
  categories: ProductCategory[];

  @ManyToMany(() => ProductTag, (tag) => tag.products)
  @JoinTable()
  tags: ProductTag[];

  @ManyToMany(() => ProductAttribute, (attribute) => attribute.products)
  @JoinTable()
  attributes: ProductAttribute[];

  @ManyToMany(
    () => ProductAttributeValue,
    (attributeValue) => attributeValue.products,
  )
  @JoinTable()
  attributeValues: ProductAttributeValue[];

  @OneToOne(
    () => ProductSimpleData,
    (productSimpleData) => productSimpleData.product,
  )
  simpleData: ProductSimpleData;

  @OneToMany(
    () => ProductVariation,
    (productVariation) => productVariation.product,
  )
  productVariations: ProductVariation[];
}
