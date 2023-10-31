import { AuditEntity } from 'src/entities/audit.entity';
import {
  Entity,
  Column,
  ManyToMany,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductStockStatus } from '../enums/product-stock-status';

@Entity()
@Unique(['product'])
export class ProductSimpleData extends AuditEntity {
  @OneToOne(() => Product, (product) => product.simpleData)
  @JoinColumn()
  product: Product;

  @Column('bigint', { default: 0 })
  regularPrice: number;

  @Column('bigint', { default: 0 })
  salePrice: number;

  @Column('date', { nullable: true })
  salePriceFrom: Date;

  @Column('date', { nullable: true })
  salePriceTo: Date;

  @Column('varchar', { nullable: true })
  sku: string;

  @Column('int', { nullable: true })
  stock: number;

  @Column('int', { default: ProductStockStatus.IN_STOCK })
  stockStatus: ProductStockStatus;

  @Column('boolean', { default: false })
  soldIndividually: Boolean;

  @Column('float', { nullable: true, default: null })
  weight: number;

  @Column('float', { nullable: true, default: null })
  length: number;

  @Column('float', { nullable: true, default: null })
  width: number;

  @Column('float', { nullable: true, default: null })
  height: number;
}
