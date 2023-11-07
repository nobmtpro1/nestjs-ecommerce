import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class ProductOptionDto {
  @ApiProperty()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(3)
  position: number;

  @ApiProperty()
  @IsArray()
  values: string[];
}
