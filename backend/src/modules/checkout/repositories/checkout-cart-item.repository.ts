import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';
import { CheckoutCartItem } from '../entities/checkout-cart-item.entity';

@Injectable()
export class CheckoutCartItemRepository extends BaseRepository<CheckoutCartItem> {
  constructor(private dataSource: DataSource) {
    super(CheckoutCartItem, dataSource.createEntityManager());
  }
}
