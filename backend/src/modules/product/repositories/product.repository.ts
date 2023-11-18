import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../commons/repositories/base.repository';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }
}
