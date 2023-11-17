import {
  ArrayMaxSize,
  IsNotEmpty,
  Length,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ProductStatus } from 'src/enums/product.enum';
import { ProductStockStatus } from 'src/enums/product.enum';
import { ProductVarriantDto } from './product-variant.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductOptionDto } from './product-option.dto';

export class CreateProductDto {
  id!: string;

  @IsNotEmpty()
  status: ProductStatus;

  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsNotEmpty()
  @Length(1, 255)
  slug: string;

  description!: string;

  imageId!: string;

  tags!: string[];

  categories!: string[];

  gallery!: string[];
}

export class UpdateProductDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  @IsNotEmpty()
  status: ProductStatus;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  slug: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  imageId?: string;

  @ApiProperty()
  tags?: string[];

  @ApiProperty()
  categories?: string[];

  @ApiProperty()
  gallery?: string[];

  @ApiProperty({ isArray: true, type: ProductVarriantDto })
  @ValidateNested({ each: true })
  @Type(() => ProductVarriantDto)
  variants: ProductVarriantDto[];

  @ApiProperty({ isArray: true, type: ProductOptionDto })
  @ValidateNested({ each: true })
  @Type(() => ProductOptionDto)
  @ArrayMaxSize(3)
  options: ProductOptionDto[];
}

export class DeleteProductDto {
  @IsNotEmpty()
  id: string;
}
