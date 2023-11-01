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
import { AuthGuard } from '../../../guards/auth.guard';
import { ResponseError, ResponseSuccess } from 'src/commons/response';
import { Public } from 'src/decorators/public.decorator';
import { ProductAttributeService } from '../services/product-attribute.service';
import {
  CreateProductAttributeDto,
  DeleteProductAttributeDto,
  UpdateProductAttributeDto,
} from '../../../dtos/product-attribute.dto';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import {
  CreateProductAttributeValueDto,
  DeleteProductAttributeValueDto,
  GetProductAttributeValuesDto,
  UpdateProductAttributeValueDto,
} from '../../../dtos/product-attribute-value.dto';

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

  @Put('')
  async updateAttribute(@Body() body: UpdateProductAttributeDto) {
    try {
      const attribute = await this.productAttributeService.findById(body?.id);
      if (!attribute) {
        return new ResponseError('Not found', 404);
      }
      const updated = await this.productAttributeService.update(
        attribute,
        body,
      );
      return new ResponseSuccess('Success', updated);
    } catch (error) {
      return new ResponseError(error?.message, 400);
    }
  }

  @Delete('')
  async deleteAttribute(@Body() body: DeleteProductAttributeDto) {
    try {
      const attribute = await this.productAttributeService.findById(body?.id);
      if (!attribute) {
        return new ResponseError('Not found', 404);
      }
      const deleted = await this.productAttributeService.delete(attribute);
      return new ResponseSuccess('Success', deleted);
    } catch (error) {
      if (error?.sqlState == 23000) {
        return new ResponseError(
          'You must remove all attribute values first',
          400,
        );
      }
      return new ResponseError(error?.message, 400);
    }
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

  @Post('values')
  async createAttributeValue(@Body() body: CreateProductAttributeValueDto) {
    try {
      const attribute = await this.productAttributeService.findById(
        body?.attributeId,
      );
      if (!attribute) {
        return new ResponseError('Not found', 404);
      }
      const productAttributeValue =
        await this.productAttributeService.createAttributeValue(
          body,
          attribute,
        );
      return new ResponseSuccess('Success', productAttributeValue);
    } catch (error) {
      return new ResponseError(error?.message, 400);
    }
  }

  @Put('values')
  async updateAttributeValue(@Body() body: UpdateProductAttributeValueDto) {
    try {
      const attributeValue =
        await this.productAttributeService.findAttributeValueById(body?.id);
      if (!attributeValue) {
        return new ResponseError('Not found', 404);
      }
      const updated = await this.productAttributeService.updateAttributeValue(
        attributeValue,
        body,
      );
      return new ResponseSuccess('Success', updated);
    } catch (error) {
      return new ResponseError(error?.message, 400);
    }
  }

  @Delete('values')
  async deleteAttributeValue(@Body() body: DeleteProductAttributeValueDto) {
    try {
      const attributeValue =
        await this.productAttributeService.findAttributeValueById(body?.id);
      console.log(body);
      console.log(attributeValue);
      if (!attributeValue) {
        return new ResponseError('Not found', 404);
      }
      const deleted = await this.productAttributeService.deleteAttributeValue(
        attributeValue,
      );
      return new ResponseSuccess('Success', deleted);
    } catch (error) {
      return new ResponseError(error?.message, 400);
    }
  }
}
