import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';
import { CheckoutOrder } from '../entities/checkout-order.entity';

@Injectable()
export class CheckoutOrderRepository extends BaseRepository<CheckoutOrder> {
  constructor(private dataSource: DataSource) {
    super(CheckoutOrder, dataSource.createEntityManager());
  }
}
