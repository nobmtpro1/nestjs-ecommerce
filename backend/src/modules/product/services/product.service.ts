import { Inject, Injectable } from '@nestjs/common';
import { IsNull, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductType, productTypes } from 'src/enums/product-type.enum';
import { Image } from 'src/entities/image.entity';
import { ProductCategory } from 'src/entities/product-category.entity';
import { productStatus } from 'src/enums/product-status.enum';
import { ProductTag } from 'src/entities/product-tag.entity';
import slugify from 'slugify';
import { Guid } from 'guid-typescript';
import { productStockStatus } from 'src/enums/product-stock-status.enum';
import { CreateProductDto, UpdateProductDto } from '../../../dtos/product.dto';
import { ProductAttributeValue } from 'src/entities/product-attribute-value.entity';
import { ProductAttribute } from 'src/entities/product-attribute.entity';
import { ProductVariant } from 'src/entities/product-variant.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,
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
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        image: true,
        gallery: true,
        categories: true,
        tags: true,
        attributes: {
          productAttributeValues: true,
        },
        attributeValues: {
          productAttribute: true,
        },
        productVariants: true,
      },
    });

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
        attributes: {
          productAttributeValues: true,
        },
        attributeValues: {
          productAttribute: true,
        },
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

    product.attributeValues = body.attributeValueIds.map((id) => {
      const obj = new ProductAttributeValue();
      obj.id = id;
      return obj;
    });
    product.attributes = body.attributeIds.map((id) => {
      const obj = new ProductAttribute();
      obj.id = id;
      return obj;
    });

    const productVariants = [];
    for (const productVariant of body.productVariants) {
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
      obj.productAttributeValue1 = (() => {
        const obj = new ProductAttributeValue();
        obj.id = productVariant?.productAttributeValue1Id;
        return obj;
      })();
      obj.productAttributeValue2 = (() => {
        const obj = new ProductAttributeValue();
        obj.id = productVariant?.productAttributeValue2Id;
        return obj;
      })();
      await obj.save();
      productVariants.push(obj);
    }

    product.productVariants = productVariants;

    await product.save();

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
