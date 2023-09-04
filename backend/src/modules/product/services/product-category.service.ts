import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/entities/product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async all() {
    const products = await this.productCategoryRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: { image: true, products: true },
    });
    return products;
  }
}
