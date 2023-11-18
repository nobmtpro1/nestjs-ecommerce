import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../commons/repositories/base.repository';
import { ProductCategory } from 'src/entities/product-category.entity';

@Injectable()
export class ProductCategoryRepository extends BaseRepository<ProductCategory> {
  constructor(private dataSource: DataSource) {
    super(ProductCategory, dataSource.createEntityManager());
  }
}
