import {
  IsNotEmpty,
  Length,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ProductStatus } from 'src/enums/product-status.enum';
import { ProductStockStatus } from 'src/enums/product-stock-status.enum';
import { ProductType } from 'src/enums/product-type.enum';
import { ProductVarriantDto } from './product-variant.dto';
import { Type } from 'class-transformer';

export class CreateProductDto {
  id!: string;

  @IsNotEmpty()
  type: ProductType;

  @IsNotEmpty()
  status: ProductStatus;

  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsNotEmpty()
  @Length(1, 255)
  slug: string;

  @MaxLength(255)
  shortDescription: string;

  description!: string;

  imageId!: string;

  tags!: string[];

  categories!: string[];

  gallery!: string[];
}

export class UpdateProductDto {
  id!: string;

  @IsNotEmpty()
  type: ProductType;

  @IsNotEmpty()
  status: ProductStatus;

  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsNotEmpty()
  @Length(1, 255)
  slug: string;

  @MaxLength(255)
  shortDescription: string;

  description?: string;

  imageId?: string;

  tags?: string[];

  categories?: string[];

  gallery?: string[];

  attributeValueIds: string[];

  attributeIds: string[];

  @ValidateNested({ each: true })
  @Type(() => ProductVarriantDto)
  productVariants: ProductVarriantDto[];
}

export class DeleteProductDto {
  @IsNotEmpty()
  id: string;
}
