import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../commons/repositories/base.repository';
import { Product } from 'src/entities/product.entity';
import { SearchProductDto } from '../dtos/product.dto';
import { EQueryOrder } from 'src/commons/enums/query.enums';
import { Pagination } from 'src/commons/interfaces/pagination.interface';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async search(query: SearchProductDto): Promise<Pagination<Product>> {
    const { search, limit, page, orderBy, order } = query;
    const offset = (page - 1) * limit;

    const queryBuilder = this.createQueryBuilder('product');

    if (search) {
      queryBuilder.where('product.title like :search', {
        search: `%${search}%`,
      });
    }

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
      .offset(offset)
      .getRawMany();

    const total = await this.createQueryBuilder('product').getCount();

    const productIds = productsRawQuery.map((product) => product.id);

    let products: any = await this.createQueryBuilder('product')
      .where('product.id IN(:...ids)', { ids: productIds })
      .leftJoinAndSelect('product.image', 'image')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.tags', 'tags')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('product.options', 'options')
      .getMany();
    products = products.sort(
      (a: Product, b: Product) =>
        productIds.indexOf(a.id) - productIds.indexOf(b.id),
    );
    // console.log(productIds);

    return new Pagination<Product>({
      results: products,
      totalItems: total,
      pageSize: limit,
      currentPage: page,
    });
  }
}
