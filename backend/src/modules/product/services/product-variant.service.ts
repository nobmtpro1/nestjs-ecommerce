import { Injectable } from '@nestjs/common';
import { ProductOptionRepository } from 'src/modules/product/repositories/product-option.repository';
import { ProductOptionDto } from 'src/modules/product/dtos/product-option.dto';
import { ProductVariantRepository } from 'src/modules/product/repositories/product-variant.repository';
import { ProductVariantDto } from 'src/modules/product/dtos/product-variant.dto';
import { Image } from 'src/modules/image/entities/image.entity';
import { ProductStatus } from '../enums/product.enum';

@Injectable()
export class ProductVariantService {
  constructor(private productVariantRepository: ProductVariantRepository) {}

  async create(productVariant: ProductVariantDto) {
    const variant = this.productVariantRepository.create({
      title: productVariant.title,
      price: productVariant.price,
      sku: productVariant.sku,
      compare_at_price: productVariant.compare_at_price,
      option1: productVariant.option1,
      option2: productVariant.option2,
      option3: productVariant.option3,
      weight: productVariant.weight,
      inventory_quantity: productVariant.inventory_quantity,
      requires_shipping: productVariant.requires_shipping,
    });

    variant.image = (() => {
      const obj = new Image();
      obj.id = productVariant?.image_id;
      return obj;
    })();

    return await this.productVariantRepository.save(variant, {
      reload: true,
    });
  }

  async createMany(productVariants: ProductVariantDto[]) {
    const variants: any = [];
    for (const productVariant of productVariants) {
      const variant = await this.create(productVariant);
      variants.push(variant);
    }
    return variants;
  }

  async updateOrCreate(productVariant: ProductVariantDto) {
    let variant = await this.productVariantRepository.findOne({
      where: {
        id: productVariant.id,
      },
    });
    console.log(productVariant);
    console.log(variant);
    if (!variant) {
      variant = await this.create(productVariant);
    } else {
      delete productVariant.id;
      for (const key in productVariant) {
        variant[key] = productVariant[key];
      }
      await variant.save();
    }
    return variant;
  }

  async updateOrCreateMany(productVariants: ProductVariantDto[]) {
    const variants: any = [];
    for (const productVariant of productVariants) {
      const option = await this.updateOrCreate(productVariant);
      variants.push(option);
    }
    return variants;
  }

  async findById(id: number) {
    const variant = await this.productVariantRepository.findOne({
      where: {
        id: id,
        status: ProductStatus.ACTIVE,
      },
      relations: {
        product: true,
      },
    });
    if (variant.product.status != ProductStatus.ACTIVE) {
      return null;
    }
    return variant;
  }
}
