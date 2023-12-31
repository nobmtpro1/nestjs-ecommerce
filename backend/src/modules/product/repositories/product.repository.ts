import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { Product } from 'src/modules/product/entities/product.entity';
import { SearchProductDto } from '../dtos/product.dto';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';
import { EQueryOrder } from 'src/modules/common/enums/query.enums';
import { Pagination } from 'src/modules/common/interfaces/pagination.interface';
import { ProductStatus } from '../enums/product.enum';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async search(
    query: SearchProductDto,
    productInIds: number[] | null,
  ): Promise<Pagination<Product>> {
    const { search, limit, page, orderBy, order } = query;
    const offset = (page - 1) * limit;

    const queryBuilder = this.createQueryBuilder('product').where(
      'product.status = :status',
      { status: ProductStatus.ACTIVE },
    );

    if (productInIds) {
      queryBuilder.where('product.id IN(:...ids)', { ids: productInIds });
    }

    // if (search) {
    //   queryBuilder.where('product.title like :search', {
    //     search: `%${search}%`,
    //   });
    // }

    const productsRawQuery = await queryBuilder
      .leftJoin('product.variants', 'variant')
      .select([
        'product.id as id',
        // 'SUM(DISTINCT(variant.inventory_quantity)) as inventory_quantity',
      ])
      .groupBy('product.id')
      .orderBy(
        orderBy == 'inventory_quantity'
          ? 'SUM(DISTINCT(variant.inventory_quantity))'
          : `product.${orderBy}`,
        order == EQueryOrder.DESC ? 'DESC' : 'ASC',
      )
      .limit(limit)
      .offset(offset);
    const total = await productsRawQuery.getCount();
    const productsRaw = await productsRawQuery.getRawMany();
    const productIds = productsRaw.map((product) => product.id);

    let products: any = await this.find({
      where: { id: In(productIds) },
    });
    products = products.sort(
      (a: Product, b: Product) =>
        productIds.indexOf(a.id) - productIds.indexOf(b.id),
    );

    return new Pagination<Product>({
      results: products,
      totalItems: total,
      pageSize: limit,
      currentPage: page,
    });
  }
}
