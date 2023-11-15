import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductCategoryService } from './services/product-category.service';
import { ProductTagService } from './services/product-tag.service';
import { ProductTagController } from './controllers/product-tag.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductCategoryRepository } from 'src/repositories/product-category.repository';
import { ProductTagRepository } from 'src/repositories/product-tag.repository';
import { ProductOptionRepository } from 'src/repositories/product-option.repository';
import { ProductVariantRepository } from 'src/repositories/product-variant.repository';

@Module({
  imports: [TypeOrmModule, JwtModule, UserModule, AuthorizationModule],
  controllers: [
    ProductController,
    ProductCategoryController,
    ProductTagController,
  ],
  providers: [
    ProductService,
    ProductCategoryService,
    ProductTagService,
    ProductRepository,
    ProductCategoryRepository,
    ProductTagRepository,
    ProductOptionRepository,
    ProductVariantRepository,
  ],
  exports: [ProductService, ProductCategoryService, ProductTagService],
})
export class ProductModule {}
