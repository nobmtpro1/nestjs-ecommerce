import { IsNotEmpty, IsOptional, Length, ValidateIf } from 'class-validator';
import { Guid } from 'guid-typescript';
import { DifferentTo } from 'src/decorators/different-to-validator.decorator';
import { ProductStatus } from 'src/enums/product-status.enum';
import { ProductStockStatus } from 'src/enums/product-stock-status.enum';

export class ProductVarriantDto {
  @IsOptional()
  id?: string;

  @IsOptional()
  sku: string;

  @IsNotEmpty()
  status: ProductStatus;

  @IsNotEmpty()
  downloadable: boolean;

  @IsNotEmpty()
  isVirtual: boolean;

  @IsNotEmpty()
  isManageStock: boolean;

  @IsNotEmpty()
  regularPrice: number;

  @IsOptional()
  salePrice: number;

  @IsOptional()
  salePriceFrom: Date;

  @IsOptional()
  salePriceTo: Date;

  @IsOptional()
  stock?: number;

  @IsNotEmpty()
  stockStatus: ProductStockStatus;

  @IsNotEmpty()
  soldIndividually: boolean;

  @IsOptional()
  weight: number;

  @IsOptional()
  height: number;

  @IsOptional()
  length: number;

  @IsOptional()
  width: number;

  @IsOptional()
  @DifferentTo(['productAttributeValue2Id', 'productAttributeValue3Id'])
  productAttributeValue1Id?: string;

  @IsOptional()
  @DifferentTo(['productAttributeValue1Id', 'productAttributeValue3Id'])
  productAttributeValue2Id?: string;

  @IsOptional()
  @DifferentTo(['productAttributeValue2Id', 'productAttributeValue1Id'])
  productAttributeValue3Id?: string;
}
