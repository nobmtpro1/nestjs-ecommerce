import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../commons/repositories/base.repository';
import { ProductOption } from 'src/entities/product-option.entity';

@Injectable()
export class ProductOptionRepository extends BaseRepository<ProductOption> {
  constructor(private dataSource: DataSource) {
    super(ProductOption, dataSource.createEntityManager());
  }
}
