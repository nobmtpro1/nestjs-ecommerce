import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateProductAttributeValueDto {
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  attributeId: string;
}

export class UpdateProductAttributeValueDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty()
  name: string;
}

export class DeleteProductAttributeValueDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}

export class GetProductAttributeValuesDto {
  @IsNotEmpty()
  id: string;
}
