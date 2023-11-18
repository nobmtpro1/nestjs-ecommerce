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
  ManyToOne,
} from 'typeorm';
import { Image } from './image.entity';
import { ProductStatus } from '../modules/product/enums/product.enum';
import { ProductCategory } from './product-category.entity';
import { ProductTag } from './product-tag.entity';
import { ProductVariant } from './product-variant.entity';
import { ProductOption } from './product-option.entity';
import { Transform } from 'class-transformer';

@Entity({ name: 'product' })
export class Product extends AuditEntity {
  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('longtext', { name: 'body_html' })
  body_html: string;

  @ManyToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @ManyToMany(() => Image)
  @JoinTable({ name: 'product_m2m_image' })
  images: Image[];

  @Column('varchar', { name: 'status', default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @Column('varchar', { name: 'handle', length: 1000, unique: true })
  handle: string;

  @ManyToMany(() => ProductCategory, (category) => category.products)
  @JoinTable({ name: 'product_m2m_product_category' })
  categories: ProductCategory[];

  @ManyToMany(() => ProductTag, (tag) => tag.products)
  @JoinTable({ name: 'product_m2m_product_tag' })
  @Transform(({ value }) => value.map((tag: ProductTag) => tag.name).toString())
  tags: ProductTag[];

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];

  @OneToMany(() => ProductOption, (option) => option.product)
  options: ProductOption[];
}
