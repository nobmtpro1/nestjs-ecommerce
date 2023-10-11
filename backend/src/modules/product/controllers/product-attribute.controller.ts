import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { ResponseError, ResponseSuccess } from 'src/commons/dtos/response.dto';
import { Public } from 'src/commons/decorators';
import { ProductAttributeService } from '../services/product-attribute.service';
import { CreateProductAttributeDto } from '../dtos/create-product-attribute.dto';
import { GetProductAttributeValuesDto } from '../dtos/get-product-attribute-values.dto';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

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
  @ApiQuery({
    name: 'id',
    type: String,
  })
  @Get('values')
  async allValues(@Query() query: GetProductAttributeValuesDto) {
    const attribute = await this.productAttributeService.findById(query?.id);
    if (!attribute) {
      return new ResponseError('Not found', 404);
    }
    console.log(attribute.productAttributeValues);
    return new ResponseSuccess('Success', {
      attributeValues: attribute.productAttributeValues,
    });
  }

  @Post('')
  async create(@Body() body: CreateProductAttributeDto) {
    try {
      const productAttribute = await this.productAttributeService.create(body);
      return new ResponseSuccess('Success', productAttribute);
    } catch (error) {
      return new ResponseError(error?.message, 400);
    }
  }

  @Public()
  @ApiParam({
    name: 'id',
    type: String,
  })
  @Get(':id')
  async findById(@Param('id') id) {
    let attribute = await this.productAttributeService.findById(id);
    if (!attribute) {
      return new ResponseError('Not found', 404);
    }
    return new ResponseSuccess('Success', attribute);
  }
}
