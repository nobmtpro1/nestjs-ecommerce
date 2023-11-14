import { AuditEntity } from './audit.entity';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'product_option' })
export class ProductOption extends AuditEntity {
  @ManyToOne(() => Product, (product) => product.options)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('int', { name: 'position' })
  position: number;

  @Column('simple-array', { name: 'values', nullable: false })
  values: string[];

  @BeforeUpdate()
  @BeforeInsert()
  public updatetoLowerCase() {
    this.name = this.name.toLowerCase();
    this.values = this.values.map((value) => value.toLowerCase());
  }
}
