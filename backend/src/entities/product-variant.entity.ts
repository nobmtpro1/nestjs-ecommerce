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
import { ProductStockStatus } from '../enums/product.enum';
import { Image } from './image.entity';
import { ProductStatus } from '../enums/product.enum';

@Entity({ name: 'product_variant' })
export class ProductVariant extends AuditEntity {
  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @Column('varchar', { name: 'sku', nullable: true })
  sku: string;

  @Column('int', { name: 'status', default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @Column('boolean', { name: 'downloadable', default: false })
  downloadable: Boolean;

  @Column('boolean', { name: 'is_virtual', default: false })
  isVirtual: Boolean;

  @Column('boolean', { name: 'is_manage_stock', default: false })
  isManageStock?: Boolean;

  @Column('bigint', { name: 'regular_price', default: 0 })
  regularPrice: number;

  @Column('bigint', { name: 'sale_price', default: 0 })
  salePrice: number;

  @Column('date', { name: 'sale_price_from', nullable: true })
  salePriceFrom: Date;

  @Column('date', { name: 'sale_price_to', nullable: true })
  salePriceTo: Date;

  @Column('boolean', { name: 'sold_individually', default: false })
  soldIndividually: Boolean;

  @Column('int', { name: 'stock', nullable: true })
  stock: number;

  @Column('int', { name: 'stock_status', default: ProductStockStatus.IN_STOCK })
  stockStatus: ProductStockStatus;

  @Column('float', { name: 'weight', nullable: true, default: null })
  weight: number;

  @Column('float', { name: 'length', nullable: true, default: null })
  length: number;

  @Column('float', { name: 'width', nullable: true, default: null })
  width: number;

  @Column('float', { name: 'height', nullable: true, default: null })
  height: number;

  @Column('varchar', { name: 'imageId', nullable: true })
  imageId: string;

  @Column('varchar', { name: 'option1', nullable: true })
  option1: string;

  @Column('varchar', { name: 'option2', nullable: true })
  option2: string;

  @Column('varchar', { name: 'option3', nullable: true })
  option3: string;

  @BeforeUpdate()
  @BeforeInsert()
  public insertToLowerCase() {
    this.option1 = this.option1?.toLowerCase();
    this.option2 = this.option2?.toLowerCase();
    this.option3 = this.option3?.toLowerCase();
  }
}
