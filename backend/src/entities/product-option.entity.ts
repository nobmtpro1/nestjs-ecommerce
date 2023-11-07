import { AuditEntity } from 'src/entities/audit.entity';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductOption extends AuditEntity {
  @ManyToOne(() => Product, (product) => product.options)
  @JoinColumn()
  product: Product;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('int')
  position: number;

  @Column('simple-array', { nullable: false })
  values: string[];

  @BeforeUpdate()
  @BeforeInsert()
  public updatetoLowerCase() {
    this.name = this.name.toLowerCase();
    this.values = this.values.map((value) => value.toLowerCase());
  }
}
