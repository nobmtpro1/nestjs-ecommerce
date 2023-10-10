import { IsNotEmpty, Length } from 'class-validator';

export class CreateProductAttributeDto {
  @IsNotEmpty()
  @Length(1, 50)
  name: string;
}
