import { Inject, Injectable } from '@nestjs/common';
import { IsNull, Like } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { Image } from 'src/entities/image.entity';
import { ProductCategory } from 'src/entities/product-category.entity';
import { productStatus } from 'src/enums/product.enum';
import { ProductTag } from 'src/entities/product-tag.entity';
import slugify from 'slugify';
import { Guid } from 'guid-typescript';
import { CreateProductDto, UpdateProductDto } from '../../../dtos/product.dto';
import { ProductVariant } from 'src/entities/product-variant.entity';
import { ProductOption } from 'src/entities/product-option.entity';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductOptionRepository } from 'src/repositories/product-option.repository';
import { ProductVariantRepository } from 'src/repositories/product-variant.repository';
import { ProductTagRepository } from 'src/repositories/product-tag.repository';
import { ProductTagService } from './product-tag.service';
import { ImageService } from 'src/modules/image/services/image.service';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private productVariantRepository: ProductVariantRepository,
    private productOptionRepository: ProductOptionRepository,
    private productTagRepository: ProductTagRepository,
    private productTagService: ProductTagService,
    private imageService: ImageService,
  ) {}

  async get({ search }: { search?: string }) {
    const where: any = {};
    if (search) {
      where.name = Like(`%${search}%`);
    }
    const products = await this.productRepository.find({
      where,
      order: {
        createdAt: 'DESC',
      },
      relations: { image: true },
    });
    return products;
  }

  async getProductStatus() {
    return productStatus;
  }

  async create(body: CreateProductDto) {
    const handle = await this.generateSlug(body?.handle);
    const product = this.productRepository.create({
      status: body.status,
      title: body?.title,
      handle: handle,
      body_html: body?.body_html,
    });

    product.categories = body?.categories?.map((id) => {
      const obj = new ProductCategory();
      obj.id = id;
      return obj;
    });

    product.tags = await this.productTagService.createManyIfNotExist(
      body.tags.split(','),
    );

    product.images = await this.imageService.createManyIfNotExistFromUrl(
      body.images,
    );

    product.image = await this.imageService.createIfNotExistFromUrl(body.image);

    const created = await this.productRepository.save(product, {
      reload: true,
    });
    return created;
  }

  async findById(id: number) {
    // const product = await this.productRepository.findOne({
    //   where: { id },
    //   relations: {
    //     image: true,
    //     gallery: true,
    //     categories: true,
    //     tags: true,
    //     variants: true,
    //     options: true,
    //   },
    // });

    const product = this.productRepository
      .createQueryBuilder('product')
      .where('product.id = :id', { id })
      .leftJoinAndSelect('product.image', 'image')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.tags', 'tags')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('product.options', 'options')
      .getOne();

    return product;
  }

  async findBySlug(handle: string) {
    const product = await this.productRepository.findOne({
      where: { handle },
      relations: {
        image: true,
        images: true,
        categories: true,
        tags: true,
        variants: true,
        options: true,
      },
    });
    return product;
  }

  async update(product: Product, body: UpdateProductDto) {
    return product;
    // product.status = body.status;
    // product.title = body?.title;
    // product.body_html = body?.body_html;
    // if (product.handle != body?.handle) {
    //   product.handle = await this.generateSlug(body?.handle, product);
    // }

    // product.categories = body?.categories?.map((id) => {
    //   const obj = new ProductCategory();
    //   obj.id = id;
    //   return obj;
    // });
    // product.tags = body?.tags?.map((id) => {
    //   const obj = new ProductTag();
    //   obj.id = id;
    //   return obj;
    // });
    // product.image = (() => {
    //   const obj = new Image();
    //   obj.id = body?.imageId;
    //   return obj;
    // })();

    // product.images = body?.images?.map((id) => {
    //   const obj = new Image();
    //   obj.id = id;
    //   return obj;
    // });

    // const options = [];
    // for (const option of body?.options || []) {
    //   let obj = new ProductOption();
    //   if (option.id) {
    //     obj = await this.productOptionRepository.findOne({
    //       where: { id: option.id },
    //     });
    //     if (!obj) {
    //       continue;
    //     }
    //   }
    //   obj.name = option.name;
    //   obj.position = option.position;
    //   obj.values = option.values;
    //   await this.productOptionRepository.save(obj);
    //   options.push(obj);
    // }
    // product.options = options;

    // const productVariants = [];
    // for (const productVariant of body?.variants || []) {
    //   let obj = new ProductVariant();
    //   if (productVariant.id) {
    //     obj = await this.productVariantRepository.findOne({
    //       where: { id: productVariant.id },
    //     });
    //     if (!obj) {
    //       continue;
    //     }
    //   }
    //   obj.title = productVariant.title;
    //   obj.sku = productVariant.sku;
    //   obj.status = productVariant.status;
    //   obj.price = productVariant.price;
    //   obj.compare_at_price = productVariant.compare_at_price;
    //   obj.inventory_quantity = productVariant.inventory_quantity;
    //   obj.weight = productVariant.weight;
    //   obj.requires_shipping = productVariant.requires_shipping;
    //   obj.option1 = productVariant.option1;
    //   obj.option2 = productVariant.option2;
    //   obj.option3 = productVariant.option3;
    //   if (productVariant?.imageId) {
    //     obj.image = (() => {
    //       const img = new Image();
    //       img.id = productVariant?.imageId;
    //       return img;
    //     })();
    //   }
    //   await obj.save();
    //   productVariants.push(obj);
    // }
    // product.variants = productVariants;

    // await product.save();

    // const oldOptions = await this.productOptionRepository.find({
    //   where: { product: IsNull() },
    // });
    // await this.productOptionRepository.remove(oldOptions);

    // const oldProductVariants = await this.productVariantRepository.find({
    //   where: { product: IsNull() },
    // });
    // await this.productVariantRepository.remove(oldProductVariants);

    // return await this.findById(product.id);
  }

  async generateSlug(inputSlug: string, product?: Product) {
    let handle = slugify(inputSlug.toLowerCase());
    const findProduct = await this.productRepository.findOne({
      where: { handle: handle },
    });
    if (findProduct) {
      if (product) {
        if (product.id != findProduct.id) {
          handle = handle + '-' + Guid.create().toString();
        }
      } else {
        handle = handle + '-' + Guid.create().toString();
      }
    }
    return handle;
  }

  async delete(product) {
    await this.productRepository.remove(product);
    return product;
  }
}
