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
  BulkCreateProductDto,
  CreateProductDto,
  DeleteProductDto,
  SearchProductDto,
  UpdateProductDto,
} from '../dtos/product.dto';
import { ResponseError, ResponseSuccess } from 'src/modules/common/response';
import { Public } from 'src/modules/authentication/decorators/public.decorator';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductTagService } from '../services/product-tag.service';
import { RolesGuard } from 'src/modules/authorization/guards/roles.guard';
import { PermissionsGuard } from 'src/modules/authorization/guards/permissions.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IProductService } from '../interfaces/product-service.interface';
import { JwtAuthGuard } from 'src/modules/authentication/guards/jwt-auth.guard';

// @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
@Controller('product')
export class ProductController {
  constructor(
    @Inject(IProductService) private readonly productService: IProductService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly productTagService: ProductTagService,
  ) {}

  // @Public()
  @Get('')
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async get(
    @Query()
    query: SearchProductDto,
  ) {
    console.log(query);
    const products = await this.productService.get(query);
    return new ResponseSuccess('Success', products);
  }

  @ApiBearerAuth()
  @Post('')
  async postCreate(@Body() body: CreateProductDto) {
    const product = await this.productService.create(body);
    const findProduct = await this.productService.findById(product.id);
    return new ResponseSuccess('Success', findProduct);
  }

  @ApiBearerAuth()
  @Post('bulk-create')
  async bulkCreate(@Body() body: BulkCreateProductDto) {
    const products = await this.productService.bulkCreate(body.products);
    return new ResponseSuccess('Success', products);
  }

  @Public()
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findById(@Param('id', ParseIntPipe) id: number) {
    let product = await this.productService.findById(id);
    return new ResponseSuccess('Success', product);
  }

  @Public()
  @Get('/handle/:handle')
  @UseInterceptors(ClassSerializerInterceptor)
  async findByHandle(@Param('handle') handle: string) {
    let product = await this.productService.findBySlug(handle);
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
