import { IsNotEmpty, Length } from 'class-validator';

export class CreateProductTagDto {
  @IsNotEmpty()
  @Length(1, 50)
  name: string;
}
