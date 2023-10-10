import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductCategoryService } from './services/product-category.service';
import { ProductCategory } from 'src/entities/product-category.entity';
import { ProductTagService } from './services/product-tag.service';
import { ProductTag } from 'src/entities/product-tag.entity';
import { ProductTagController } from './controllers/product-tag.controller';
import { ProductSimpleData } from 'src/entities/product-simple-data.entity';
import { ProductAttribute } from 'src/entities/product-attribute.entity';
import { ProductAttributeValue } from 'src/entities/product-attribute-value.entity';
import { ProductAttributeController } from './controllers/product-attribute.controller';
import { ProductAttributeService } from './services/product-attribute.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductCategory,
      ProductTag,
      ProductSimpleData,
      ProductAttribute,
      ProductAttributeValue,
    ]),
  ],
  controllers: [
    ProductController,
    ProductCategoryController,
    ProductTagController,
    ProductAttributeController,
  ],
  providers: [
    ProductService,
    ProductCategoryService,
    ProductTagService,
    ProductAttributeService,
  ],
  exports: [
    TypeOrmModule,
    ProductService,
    ProductCategoryService,
    ProductTagService,
    ProductAttributeService,
  ],
})
export class ProductModule {}
