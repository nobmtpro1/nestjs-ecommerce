import { Inject, Injectable } from '@nestjs/common';
import { IsNull, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductType, productTypes } from 'src/enums/product.enum';
import { Image } from 'src/entities/image.entity';
import { ProductCategory } from 'src/entities/product-category.entity';
import { productStatus } from 'src/enums/product.enum';
import { ProductTag } from 'src/entities/product-tag.entity';
import slugify from 'slugify';
import { Guid } from 'guid-typescript';
import { productStockStatus } from 'src/enums/product.enum';
import { CreateProductDto, UpdateProductDto } from '../../../dtos/product.dto';
import { ProductVariant } from 'src/entities/product-variant.entity';
import { ProductOption } from 'src/entities/product-option.entity';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductOptionRepository } from 'src/repositories/product-option.repository';
import { ProductVariantRepository } from 'src/repositories/product-variant.repository';
import { ProductCategoryRepository } from 'src/repositories/product-category.repository';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private productCategoryRepository: ProductCategoryRepository,
    private productVariantRepository: ProductVariantRepository,
    private productOptionRepository: ProductOptionRepository,
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

  async getProductTypes() {
    return productTypes;
  }

  async getProductStatus() {
    return productStatus;
  }

  async getProductStockStatus() {
    return productStockStatus;
  }

  async create(body: CreateProductDto) {
    const slug = await this.generateSlug(body?.slug);
    const product = this.productRepository.create({
      status: body.status,
      type: body?.type,
      name: body?.name,
      slug: slug,
      shortDescription: body?.shortDescription,
      description: body?.description,
      categories: body?.categories?.map((id) => ({
        ...new ProductCategory(),
        id,
      })),
    });

    product.categories = body?.categories?.map((id) => {
      const obj = new ProductCategory();
      obj.id = id;
      return obj;
    });
    product.tags = body?.tags?.map((id) => {
      const obj = new ProductTag();
      obj.id = id;
      return obj;
    });

    const image = new Image();
    image.id = body?.imageId;
    product.image = image;

    product.gallery = body?.gallery?.map((id) => {
      const obj = new Image();
      obj.id = id;
      return obj;
    });
    const created = await this.productRepository.save(product, {
      reload: true,
    });
    return created;
  }

  async findById(id: string) {
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
      .leftJoinAndSelect('product.gallery', 'gallery')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.tags', 'tags')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('product.options', 'options')
      .getOne();

    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: {
        image: true,
        gallery: true,
        categories: true,
        tags: true,
        variants: true,
        options: true,
      },
    });
    return product;
  }

  async update(product: Product, body: UpdateProductDto) {
    product.status = body.status;
    product.name = body?.name;
    product.shortDescription = body?.shortDescription;
    product.description = body?.description;
    product.type = body?.type;
    if (product.slug != body?.slug) {
      product.slug = await this.generateSlug(body?.slug, product);
    }

    product.categories = body?.categories?.map((id) => {
      const obj = new ProductCategory();
      obj.id = id;
      return obj;
    });
    product.tags = body?.tags?.map((id) => {
      const obj = new ProductTag();
      obj.id = id;
      return obj;
    });
    product.image = (() => {
      const obj = new Image();
      obj.id = body?.imageId;
      return obj;
    })();

    product.gallery = body?.gallery?.map((id) => {
      const obj = new Image();
      obj.id = id;
      return obj;
    });

    const options = [];
    for (const option of body?.options || []) {
      let obj = new ProductOption();
      if (option.id) {
        obj = await this.productOptionRepository.findOne({
          where: { id: option.id },
        });
        if (!obj) {
          continue;
        }
      }
      obj.name = option.name;
      obj.position = option.position;
      obj.values = option.values;
      await this.productOptionRepository.save(obj);
      options.push(obj);
    }
    product.options = options;

    const productVariants = [];
    for (const productVariant of body?.variants || []) {
      let obj = new ProductVariant();
      if (productVariant.id) {
        obj = await this.productVariantRepository.findOne({
          where: { id: productVariant.id },
        });
        if (!obj) {
          continue;
        }
      }
      obj.sku = productVariant.sku;
      obj.status = productVariant.status;
      obj.downloadable = productVariant.downloadable;
      obj.isVirtual = productVariant.isVirtual;
      obj.isManageStock = productVariant.isManageStock;
      obj.regularPrice = productVariant.regularPrice;
      obj.salePrice = productVariant.salePrice;
      obj.salePriceFrom = productVariant.salePriceFrom;
      obj.salePriceTo = productVariant.salePriceTo;
      obj.stock = productVariant.stock;
      obj.stockStatus = productVariant.stockStatus;
      obj.soldIndividually = productVariant.soldIndividually;
      obj.weight = productVariant.weight;
      obj.height = productVariant.height;
      obj.length = productVariant.length;
      obj.width = productVariant.width;
      obj.option1 = productVariant.option1;
      obj.option2 = productVariant.option2;
      obj.option3 = productVariant.option3;
      await obj.save();
      productVariants.push(obj);
    }
    product.variants = productVariants;

    await product.save();

    const oldOptions = await this.productOptionRepository.find({
      where: { product: IsNull() },
    });
    await this.productOptionRepository.remove(oldOptions);

    const oldProductVariants = await this.productVariantRepository.find({
      where: { product: IsNull() },
    });
    await this.productVariantRepository.remove(oldProductVariants);

    return await this.findById(product.id);
  }

  async generateSlug(inputSlug: string, product?: Product) {
    let slug = slugify(inputSlug.toLowerCase());
    const findProduct = await this.productRepository.findOne({
      where: { slug: slug },
    });
    if (findProduct) {
      if (product) {
        if (product.id != findProduct.id) {
          slug = slug + '-' + Guid.create().toString();
        }
      } else {
        slug = slug + '-' + Guid.create().toString();
      }
    }
    return slug;
  }

  async delete(product) {
    await this.productRepository.remove(product);
    return product;
  }
}
