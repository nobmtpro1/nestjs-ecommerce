import { IsEmpty, IsNotEmpty, Length, MaxLength } from 'class-validator';
import { ProductType } from 'src/entities/enums/product-type.enum';

export class CreateProductDto {
  @IsNotEmpty()
  type: ProductType;

  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsNotEmpty()
  @Length(1, 255)
  slug: string;

  @MaxLength(255)
  shortDescription!: string;

  description!: string;

  imageId!: string;

  tags!: string[];

  categories!: string[];

  gallery!: string[];
}
