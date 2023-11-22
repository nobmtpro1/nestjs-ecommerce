import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductCategory } from 'src/entities/product-category.entity';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';

@Injectable()
export class ProductCategoryRepository extends BaseRepository<ProductCategory> {
  constructor(private dataSource: DataSource) {
    super(ProductCategory, dataSource.createEntityManager());
  }
}
