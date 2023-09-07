import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ResponseError, ResponseSuccess } from 'src/commons/dtos/response.dto';
import { Public } from 'src/commons/decorators';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductTagService } from '../services/product-tag.service';
import { DeleteProductDto } from '../dtos/delete-product.dto';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly productTagService: ProductTagService,
  ) {}

  @Public()
  @Get('')
  async get(@Query() query: { search?: string }) {
    const products = await this.productService.get({
      search: query?.search,
    });
    return new ResponseSuccess('Success', products);
  }

  @Get('related-data')
  async getRelatedData() {
    const productCategories = await this.productCategoryService.all();
    const productTypes = await this.productService.getProductTypes();
    const productStatus = await this.productService.getProductStatus();
    const productStockStatus =
      await this.productService.getProductStockStatus();
    const productTags = await this.productTagService.all();
    return new ResponseSuccess('Success', {
      productTypes,
      productCategories,
      productStatus,
      productTags,
      productStockStatus,
    });
  }

  @Post('')
  async postCreate(@Body() body: CreateProductDto) {
    const product = await this.productService.create(body);
    return new ResponseSuccess('Success', product);
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id) {
    const product = await this.productService.findById(id);
    return new ResponseSuccess('Success', product);
  }

  @Put('')
  async update(@Body() body: CreateProductDto) {
    const product = await this.productService.findById(body?.id);
    if (!product) {
      return new ResponseError('Not Found');
    }
    const updatedProduct = await this.productService.update(product, body);
    return new ResponseSuccess('Success', updatedProduct);
  }

  @Delete('')
  async delete(@Body() body: DeleteProductDto) {
    const product = await this.productService.findById(body?.id);
    if (!product) {
      return new ResponseError('Not Found');
    }
    const deletedProduct = await this.productService.delete(product);
    return new ResponseSuccess('Success', deletedProduct);
  }
}
