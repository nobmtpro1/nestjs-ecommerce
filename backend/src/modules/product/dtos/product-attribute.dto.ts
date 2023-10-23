import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateProductAttributeDto {
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty()
  name: string;
}

export class UpdateProductAttributeDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty()
  name: string;
}

export class DeleteProductAttributeDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
