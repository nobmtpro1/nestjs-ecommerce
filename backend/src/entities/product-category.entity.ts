import { AuditEntity } from 'src/entities/audit.entity';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Image } from './image.entity';

@Entity()
export class ProductCategory extends AuditEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 1000 })
  slug: string;

  @Column('longtext')
  description: string;

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image;

  @ManyToOne((type) => ProductCategory, (category) => category.children)
  parent: ProductCategory;

  @OneToMany((type) => ProductCategory, (category) => category.parent)
  children: ProductCategory[];
}
