import { AuditEntity } from './audit.entity';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Image } from './image.entity';
import { Product } from './product.entity';

@Entity({ name: 'product_category' })
export class ProductCategory extends AuditEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'slug', length: 1000, unique: true })
  slug: string;

  @Column('longtext', { name: 'description' })
  description: string;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @ManyToOne((type) => ProductCategory, (category) => category.children)
  parent: ProductCategory;

  @OneToMany((type) => ProductCategory, (category) => category.parent)
  children: ProductCategory[];

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
