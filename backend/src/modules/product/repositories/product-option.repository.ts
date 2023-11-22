import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductOption } from 'src/entities/product-option.entity';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';

@Injectable()
export class ProductOptionRepository extends BaseRepository<ProductOption> {
  constructor(private dataSource: DataSource) {
    super(ProductOption, dataSource.createEntityManager());
  }
}
