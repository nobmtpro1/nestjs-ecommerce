import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length, ValidateIf } from 'class-validator';
import { Guid } from 'guid-typescript';
import { DifferentTo } from 'src/decorators/different-to-validator.decorator';
import { ProductStatus } from 'src/enums/product.enum';
import { ProductStockStatus } from 'src/enums/product.enum';
import { BeforeInsert, BeforeUpdate } from 'typeorm';

export class ProductVarriantDto {
  @ApiProperty()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsOptional()
  sku: string;

  @ApiProperty()
  @IsNotEmpty()
  status: ProductStatus;

  @ApiProperty()
  @IsNotEmpty()
  downloadable: boolean;

  @ApiProperty()
  @IsNotEmpty()
  isVirtual: boolean;

  @ApiProperty()
  @IsNotEmpty()
  isManageStock: boolean;

  @ApiProperty()
  @IsNotEmpty()
  regularPrice: number;

  @ApiProperty()
  @IsOptional()
  salePrice: number;

  @ApiProperty()
  @IsOptional()
  salePriceFrom: Date;

  @ApiProperty()
  @IsOptional()
  salePriceTo: Date;

  @ApiProperty()
  @IsOptional()
  stock?: number;

  @ApiProperty()
  @IsNotEmpty()
  stockStatus: ProductStockStatus;

  @ApiProperty()
  @IsNotEmpty()
  soldIndividually: boolean;

  @ApiProperty()
  @IsOptional()
  weight: number;

  @ApiProperty()
  @IsOptional()
  height: number;

  @ApiProperty()
  @IsOptional()
  length: number;

  @ApiProperty()
  @IsOptional()
  width: number;

  @ApiProperty()
  @IsOptional()
  option1: string;

  @ApiProperty()
  @IsOptional()
  option2: string;

  @ApiProperty()
  @IsOptional()
  option3: string;
}
