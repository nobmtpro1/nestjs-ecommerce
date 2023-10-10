import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { ResponseError, ResponseSuccess } from 'src/commons/dtos/response.dto';
import { Public } from 'src/commons/decorators';
import { ProductAttributeService } from '../services/product-attribute.service';
import { CreateProductAttributeDto } from '../dtos/create-product-attribute.dto';

@UseGuards(AuthGuard)
@Controller('product-attribute')
export class ProductAttributeController {
  constructor(
    private readonly productAttributeService: ProductAttributeService,
  ) {}

  @Public()
  @Get('')
  async all() {
    const attributes = await this.productAttributeService.all();
    return new ResponseSuccess('Success', attributes);
  }

  @Public()
  @Post('')
  async create(@Body() body: CreateProductAttributeDto) {
    try {
      const productAttribute = await this.productAttributeService.create(body);
      return new ResponseSuccess('Success', productAttribute);
    } catch (error) {
      return new ResponseError(error?.message, 400);
    }
  }
}
