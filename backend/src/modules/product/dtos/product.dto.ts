import {
  ArrayMaxSize,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ProductStatus } from 'src/modules/product/enums/product.enum';
import { ProductVariantDto } from './product-variant.dto';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductOptionDto } from './product-option.dto';
import { ImageDto } from '../../image/dtos/image.dto';
import { EQueryOrder } from 'src/modules/common/enums/query.enums';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  status: ProductStatus;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  handle: string;

  @ApiProperty()
  body_html?: string;

  image?: ImageDto;

  tags?: string;

  categories?: number[];

  @ApiProperty({ isArray: true, type: ImageDto })
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];

  @ApiProperty({ isArray: true, type: ProductVariantDto })
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];

  @ApiProperty({ isArray: true, type: ProductOptionDto })
  @ValidateNested({ each: true })
  @Type(() => ProductOptionDto)
  @ArrayMaxSize(3)
  options: ProductOptionDto[];
}

export class UpdateProductDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  @IsNotEmpty()
  status: ProductStatus;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  handle: string;

  @ApiProperty()
  body_html?: string;

  @ApiProperty()
  image?: ImageDto;

  @ApiProperty()
  tags?: string;

  @ApiProperty()
  categories?: number[];

  @ApiProperty({ isArray: true, type: ImageDto })
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];

  @ApiProperty({ isArray: true, type: ProductVariantDto })
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];

  @ApiProperty({ isArray: true, type: ProductOptionDto })
  @ValidateNested({ each: true })
  @Type(() => ProductOptionDto)
  @ArrayMaxSize(3)
  options: ProductOptionDto[];
}

export class DeleteProductDto {
  @IsNotEmpty()
  id: number;
}

export class SearchProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Transform((obj) => parseInt(obj.value))
  limit?: number = 3;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Transform((obj) => parseInt(obj.value))
  page?: number = 1;

  @ApiProperty({ required: false })
  @IsIn(['title', 'created_at', 'inventory_quantity'])
  orderBy?: string = 'created_at';

  @ApiProperty({ required: false })
  @IsIn(['asc', 'desc'])
  @IsOptional()
  order?: EQueryOrder = EQueryOrder.DESC;
}
