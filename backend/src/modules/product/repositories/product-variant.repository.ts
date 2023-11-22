import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductVariant } from 'src/entities/product-variant.entity';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';

@Injectable()
export class ProductVariantRepository extends BaseRepository<ProductVariant> {
  constructor(private dataSource: DataSource) {
    super(ProductVariant, dataSource.createEntityManager());
  }
}
