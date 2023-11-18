import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../../authentication/guards/auth.guard';
import { ProductService } from '../services/product.service';
import {
  CreateProductDto,
  DeleteProductDto,
  UpdateProductDto,
} from '../dtos/product.dto';
import { ResponseError, ResponseSuccess } from 'src/commons/response';
import { Public } from 'src/modules/authentication/decorators/public.decorator';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductTagService } from '../services/product-tag.service';
import { RolesGuard } from 'src/modules/authorization/guards/roles.guard';
import { PermissionsGuard } from 'src/modules/authorization/guards/permissions.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IProductService } from '../interfaces/product-service.interface';

// @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
@Controller('product')
export class ProductController {
  constructor(
    @Inject(IProductService) private readonly productService: IProductService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly productTagService: ProductTagService,
  ) {}

  @Public()
  @Get('')
  @UseInterceptors(ClassSerializerInterceptor)
  async get(@Query() query: { search?: string }) {
    const products = await this.productService.get({
      search: query?.search,
    });
    return new ResponseSuccess('Success', products);
  }

  @Public()
  @Get('related-data')
  async getRelatedData() {
    const productCategories = await this.productCategoryService.all();
    const productStatus = await this.productService.getProductStatus();
    const productTags = await this.productTagService.all();
    return new ResponseSuccess('Success', {
      productCategories,
      productStatus,
      productTags,
    });
  }

  @ApiBearerAuth()
  @Post('')
  async postCreate(@Body() body: CreateProductDto) {
    const product = await this.productService.create(body);
    const findProduct = await this.productService.findById(product.id);
    return new ResponseSuccess('Success', findProduct);
  }

  @Public()
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findById(@Param('id', ParseIntPipe) id: number) {
    let product = await this.productService.findById(id);
    return new ResponseSuccess('Success', product);
  }

  @Public()
  @Put('')
  async update(@Body() body: UpdateProductDto) {
    try {
      const product = await this.productService.findById(body?.id);
      if (!product) {
        throw new NotFoundException();
      }
      const updatedProduct = await this.productService.update(product, body);
      return new ResponseSuccess('Success', updatedProduct);
    } catch (error) {
      return new ResponseError(error?.message, 400);
    }
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
