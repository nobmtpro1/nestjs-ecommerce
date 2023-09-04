import { ProductType } from 'src/entities/enums/product-type.enum';
import { AuditEntity } from 'src/entities/audit.entity';
import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Image } from './image.entity';
import { ProductStatus } from './enums/is-active.enum';
import { ProductCategory } from './product-category.entity';
import { ProductTag } from './product-tag.entity';

@Entity()
export class Product extends AuditEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 1000 })
  shortDescription: string;

  @Column('longtext')
  description: string;

  @Column('int', { default: ProductType.SIMPLE })
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
}
