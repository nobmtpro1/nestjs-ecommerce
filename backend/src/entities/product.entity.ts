import { ProductType } from 'src/modules/product/enums/product-type.enum';
import { AuditEntity } from 'src/entities/audit.entity';
import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Image } from './image.entity';

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
}
