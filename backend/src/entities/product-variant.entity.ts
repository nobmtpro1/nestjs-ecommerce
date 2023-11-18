import { AuditEntity } from './audit.entity';
import {
  Entity,
  Column,
  ManyToMany,
  OneToOne,
  JoinColumn,
  Unique,
  ManyToOne,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { Product } from './product.entity';
import { Image } from './image.entity';
import { ProductStatus } from '../enums/product.enum';

@Entity({ name: 'product_variant' })
export class ProductVariant extends AuditEntity {
  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('varchar', { name: 'title', nullable: true })
  title: string;

  @Column('bigint', { name: 'price', default: 0 })
  price: number;

  @Column('varchar', { name: 'sku', nullable: true })
  sku: string;

  @Column('bigint', { name: 'compare_at_price', default: 0, nullable: true })
  compare_at_price?: number;

  @Column('varchar', { name: 'option1', nullable: true })
  option1: string;

  @Column('varchar', { name: 'option2', nullable: true })
  option2: string;

  @Column('varchar', { name: 'option3', nullable: true })
  option3: string;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @Column('float', { name: 'weight', nullable: true, default: null })
  weight: number;

  @Column('int', { name: 'inventory_quantity', nullable: true })
  inventory_quantity: number;

  @Column('boolean', { name: 'requires_shipping', default: false })
  requires_shipping: Boolean;

  @Column('varchar', { name: 'status', default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @BeforeUpdate()
  @BeforeInsert()
  public insertToLowerCase() {
    this.option1 = this.option1?.toLowerCase();
    this.option2 = this.option2?.toLowerCase();
    this.option3 = this.option3?.toLowerCase();
  }
}
