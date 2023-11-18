import { Injectable } from '@nestjs/common';
import { ProductOptionRepository } from 'src/modules/product/repositories/product-option.repository';
import { ProductOptionDto } from 'src/modules/product/dtos/product-option.dto';
import { ProductOption } from 'src/entities/product-option.entity';

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

  async updateOrCreate(productOption: ProductOptionDto) {
    let option = await this.productOptionRepository.findOne({
      where: {
        id: productOption.id,
      },
    });
    if (!option) {
      option = await this.create(productOption);
    } else {
      delete productOption.id;
      for (const key in productOption) {
        option[key] = productOption[key];
      }
      await option.save();
    }
    return option;
  }

  async updateOrCreateMany(productOptions: ProductOptionDto[]) {
    const options: any = [];
    for (const productOption of productOptions) {
      const option = await this.updateOrCreate(productOption);
      options.push(option);
    }
    return options;
  }
}
