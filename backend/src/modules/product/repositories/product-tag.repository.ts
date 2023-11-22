import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductTag } from 'src/entities/product-tag.entity';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';

@Injectable()
export class ProductTagRepository extends BaseRepository<ProductTag> {
  constructor(private dataSource: DataSource) {
    super(ProductTag, dataSource.createEntityManager());
  }
}
