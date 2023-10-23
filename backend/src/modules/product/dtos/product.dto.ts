import {
  IsEmpty,
  IsNotEmpty,
  Length,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { ProductStockStatus } from 'src/entities/enums/product-stock-status';
import { ProductType } from 'src/entities/enums/product-type.enum';

export class CreateProductDto {
  id!: string;

  @IsNotEmpty()
  type: ProductType;

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

  @ValidateIf((o) => o.type == ProductType.SIMPLE)
  @IsNotEmpty()
  simpleRegularPrice: number;

  @ValidateIf((o) => o.type == ProductType.SIMPLE)
  simpleSalePrice: number;

  @ValidateIf((o) => o.type == ProductType.SIMPLE)
  simpleSalePriceFrom: Date;

  @ValidateIf((o) => o.type == ProductType.SIMPLE)
  simpleSalePriceTo: Date;

  @ValidateIf((o) => o.type == ProductType.SIMPLE)
  @IsNotEmpty()
  simpleSku: string;

  @ValidateIf((o) => o.type == ProductType.SIMPLE)
  simpleStock: number;

  @ValidateIf((o) => o.type == ProductType.SIMPLE)
  simpleStockStatus: ProductStockStatus;

  @ValidateIf((o) => o.type == ProductType.SIMPLE)
  simpleStockIndividually: boolean;
}

export class DeleteProductDto {
  @IsNotEmpty()
  id: string;
}
