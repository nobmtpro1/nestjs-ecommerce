import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CheckoutCartService } from '../services/checkout-cart.service';
import { ResponseSuccess } from 'src/modules/common/response';
import { JwtAuthGuard } from 'src/modules/authentication/guards/jwt-auth.guard';
import { Public } from 'src/modules/authentication/decorators/public.decorator';

@Controller('checkout/cart')
export class CheckoutCartController {
  constructor(private readonly checkoutCartService: CheckoutCartService) {}

  @Get('')
  async getCart() {
    return new ResponseSuccess('Success');
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @Public()
  async updateCart(
    @Query('cart_id', ParseIntPipe) cartId: number,
    @Body() body,
    @Request() request,
  ) {
    console.log(request.user, cartId, body);
    const cart = await this.checkoutCartService.updateCart(
      request.user,
      cartId,
      body,
    );
    return new ResponseSuccess('Success', cart);
  }
}
