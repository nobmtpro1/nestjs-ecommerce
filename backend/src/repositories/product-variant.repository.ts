import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';
import { ProductVariant } from 'src/entities/product-variant.entity';

@Injectable()
export class ProductVariantRepository extends BaseRepository<ProductVariant> {
  constructor(private dataSource: DataSource) {
    super(ProductVariant, dataSource.createEntityManager());
  }
}
