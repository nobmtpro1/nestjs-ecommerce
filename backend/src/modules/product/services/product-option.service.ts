import { Injectable } from '@nestjs/common';
import { ProductOptionRepository } from 'src/repositories/product-option.repository';
import { ProductOptionDto } from 'src/dtos/product-option.dto';

@Injectable()
export class ProductOptionService {
  constructor(private productOptionRepository: ProductOptionRepository) {}

  async create(productOption: ProductOptionDto) {
    const option = this.productOptionRepository.create({
      name: productOption.name,
      position: productOption.position,
      values: productOption.values,
    });
    return await this.productOptionRepository.save(option, {
      reload: true,
    });
  }

  async createMany(productOptions: ProductOptionDto[]) {
    const options: any = [];
    for (const productOption of productOptions) {
      const option = await this.create(productOption);
      options.push(option);
    }
    return options;
  }
}
