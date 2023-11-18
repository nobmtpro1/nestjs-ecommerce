import {
  ArrayMaxSize,
  IsNotEmpty,
  Length,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ProductStatus } from 'src/enums/product.enum';
import { ProductVarriantDto } from './product-variant.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductOptionDto } from './product-option.dto';
import { ImageDto } from './image.dto';

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
  id: number;
}
