import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ProductType } from 'src/modules/product/enums/product-type.enum';

export class CreateProductDto {
  @IsNotEmpty()
  type: ProductType;

  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @Length(0, 255)
  shortDescription!: string;

  description!: string;

  imageId!: string;
}
