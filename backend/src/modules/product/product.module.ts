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
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { ProductCategoryRepository } from 'src/modules/product/repositories/product-category.repository';
import { ProductTagRepository } from 'src/modules/product/repositories/product-tag.repository';
import { ProductOptionRepository } from 'src/modules/product/repositories/product-option.repository';
import { ProductVariantRepository } from 'src/modules/product/repositories/product-variant.repository';
import { ImageModule } from '../image/image.module';
import { ProductOptionService } from './services/product-option.service';
import { ProductVariantService } from './services/product-variant.service';
import { PROVIDE } from 'src/commons/constants';
import { IProductService } from './interfaces/product-service.interface';

@Module({
  imports: [
    TypeOrmModule,
    JwtModule,
    UserModule,
    AuthorizationModule,
    ImageModule,
  ],
  controllers: [
    ProductController,
    ProductCategoryController,
    ProductTagController,
  ],
  providers: [
    {
      provide: IProductService,
      useClass: ProductService,
    },
    ProductCategoryService,
    ProductTagService,
    ProductOptionService,
    ProductVariantService,
    ProductRepository,
    ProductCategoryRepository,
    ProductTagRepository,
    ProductOptionRepository,
    ProductVariantRepository,
  ],
  exports: [
    IProductService,
    ProductCategoryService,
    ProductTagService,
    ProductOptionService,
    ProductVariantService,
    ProductRepository,
    ProductCategoryRepository,
    ProductTagRepository,
    ProductOptionRepository,
    ProductVariantRepository,
  ],
})
export class ProductModule {}
