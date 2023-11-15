import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';
import { ProductTag } from 'src/entities/product-tag.entity';

@Injectable()
export class ProductTagRepository extends BaseRepository<ProductTag> {
  constructor(private dataSource: DataSource) {
    super(ProductTag, dataSource.createEntityManager());
  }
}
