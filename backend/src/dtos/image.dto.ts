import { IsNotEmpty, IsOptional } from 'class-validator';

export class ImageDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  src: string;
}
