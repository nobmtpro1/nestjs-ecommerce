import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';
import { CheckoutCart } from '../entities/checkout-cart.entity';

@Injectable()
export class CheckoutCartRepository extends BaseRepository<CheckoutCart> {
  constructor(private dataSource: DataSource) {
    super(CheckoutCart, dataSource.createEntityManager());
  }
}
