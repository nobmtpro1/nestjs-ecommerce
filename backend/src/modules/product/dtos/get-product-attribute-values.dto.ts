import { IsNotEmpty, Length } from 'class-validator';
import { Guid } from 'guid-typescript';

export class GetProductAttributeValuesDto {
  @IsNotEmpty()
  id: string;
}
