import { AuditEntity } from 'src/entities/audit.entity';
import {
  Entity,
  Column,
  ManyToMany,
  OneToOne,
  JoinColumn,
  Unique,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductStockStatus } from '../enums/product.enum';
import { Image } from './image.entity';
import { ProductStatus } from 'src/enums/product.enum';
import { ProductAttributeValue } from './product-attribute-value.entity';

@Entity()
export class ProductVariant extends AuditEntity {
  @ManyToOne(() => Product, (product) => product.productVariants)
  @JoinColumn()
  product: Product;

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image;

  @Column('varchar', { nullable: true })
  sku: string;

  @Column('int', { default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @Column('boolean', { default: false })
  downloadable: Boolean;

  @Column('boolean', { default: false })
  isVirtual: Boolean;

  @Column('boolean', { default: false })
  isManageStock?: Boolean;

  @Column('bigint', { default: 0 })
  regularPrice: number;

  @Column('bigint', { default: 0 })
  salePrice: number;

  @Column('date', { nullable: true })
  salePriceFrom: Date;

  @Column('date', { nullable: true })
  salePriceTo: Date;

  @Column('boolean', { default: false })
  soldIndividually: Boolean;

  @Column('int', { nullable: true })
  stock: number;

  @Column('int', { default: ProductStockStatus.IN_STOCK })
  stockStatus: ProductStockStatus;

  @Column('float', { nullable: true, default: null })
  weight: number;

  @Column('float', { nullable: true, default: null })
  length: number;

  @Column('float', { nullable: true, default: null })
  width: number;

  @Column('float', { nullable: true, default: null })
  height: number;

  @ManyToOne(() => ProductAttributeValue, {
    nullable: true,
  })
  @JoinColumn()
  productAttributeValue1: ProductAttributeValue;

  @ManyToOne(() => ProductAttributeValue, {
    nullable: true,
  })
  @JoinColumn()
  productAttributeValue2: ProductAttributeValue;

  @ManyToOne(() => ProductAttributeValue, {
    nullable: true,
  })
  @JoinColumn()
  productAttributeValue3: ProductAttributeValue;
}
