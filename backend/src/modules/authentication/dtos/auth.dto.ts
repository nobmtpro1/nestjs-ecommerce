import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ default: 'admin@gmail.com', required: true })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: '123', required: true })
  @IsNotEmpty()
  password: string;
}
