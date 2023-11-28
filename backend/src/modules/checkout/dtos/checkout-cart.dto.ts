import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsNotEmpty,
  Max,
  Min,
  ValidateNested,
  IsArray,
  ArrayUnique,
} from 'class-validator';

export class CheckoutCartItemDto {
  @IsNotEmpty()
  @Transform((obj: any) => parseInt(obj.value))
  @Min(1)
  variantId: number;

  @IsNotEmpty()
  @Transform((obj: any) => parseInt(obj.value))
  @Min(0)
  @Max(10)
  quantity: number;
}

export class UpdateCartDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayUnique((obj) => obj.variantId, { message: 'Cart items must be unique' })
  @ValidateNested({ each: true })
  @Type(() => CheckoutCartItemDto)
  @ArrayMaxSize(10)
  items: CheckoutCartItemDto[];
}
