import { AuditEntity } from './audit.entity';
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
import { ProductStatus } from '../enums/product.enum';
import { ProductCategory } from './product-category.entity';
import { ProductTag } from './product-tag.entity';
import { ProductVariant } from './product-variant.entity';
import { ProductOption } from './product-option.entity';

@Entity({ name: 'product' })
export class Product extends AuditEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('longtext', { name: 'description' })
  description: string;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @ManyToMany(() => Image)
  @JoinTable({ name: 'product_m2m_image' })
  gallery: Image[];

  @Column('int', { name: 'status', default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @Column('varchar', { name: 'slug', length: 1000, unique: true })
  slug: string;

  @ManyToMany(() => ProductCategory, (category) => category.products)
  @JoinTable({ name: 'product_m2m_product_category' })
  categories: ProductCategory[];

  @ManyToMany(() => ProductTag, (tag) => tag.products)
  @JoinTable({ name: 'product_m2m_product_tag' })
  tags: ProductTag[];

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];

  @OneToMany(() => ProductOption, (option) => option.product)
  options: ProductOption[];
}
