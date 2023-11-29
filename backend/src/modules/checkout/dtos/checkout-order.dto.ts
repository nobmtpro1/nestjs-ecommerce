import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  Length,
  ValidateNested,
} from 'class-validator';
import { PaymentEnum } from '../enums/order.enum';
import { Type } from 'class-transformer';

export class ShippingAddressDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  provinceCode: string;

  @IsNotEmpty()
  districtCode: string;
}

export class PlaceOrderDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @IsNotEmpty()
  @IsEnum(PaymentEnum)
  payment: PaymentEnum;
}
