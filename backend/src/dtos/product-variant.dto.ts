import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length, ValidateIf } from 'class-validator';
import { Guid } from 'guid-typescript';
import { DifferentTo } from 'src/decorators/different-to-validator.decorator';
import { ProductStatus } from 'src/enums/product.enum';

export class ProductVarriantDto {
  @ApiProperty()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsOptional()
  sku: string;

  @ApiProperty()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  status: ProductStatus;

  @ApiProperty()
  @IsOptional()
  imageId?: string;

  @ApiProperty()
  @IsNotEmpty()
  requires_shipping: Boolean;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsOptional()
  compare_at_price: number;

  @ApiProperty()
  @IsOptional()
  inventory_quantity?: number;

  @ApiProperty()
  @IsOptional()
  weight: number;

  @ApiProperty()
  @IsOptional()
  @DifferentTo(['option2', 'option3'])
  option1: string;

  @ApiProperty()
  @IsOptional()
  @DifferentTo(['option1', 'option3'])
  option2: string;

  @ApiProperty()
  @IsOptional()
  @DifferentTo(['option1', 'option2'])
  option3: string;
}
