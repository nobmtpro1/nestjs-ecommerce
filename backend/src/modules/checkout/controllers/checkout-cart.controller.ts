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
import { UpdateCartDto } from '../dtos/checkout-cart.dto';
import { PlaceOrderDto } from '../dtos/checkout-order.dto';

@Controller('checkout/cart')
export class CheckoutCartController {
  constructor(private readonly checkoutCartService: CheckoutCartService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @Public()
  async getCart(
    @Query('cart_id', ParseIntPipe) cartId: number,
    @Request() request,
  ) {
    const cart = await this.checkoutCartService.getCart(request.user, cartId);
    return new ResponseSuccess('Success', cart);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @Public()
  async updateCart(
    @Query('cart_id', ParseIntPipe) cartId: number,
    @Body() body: UpdateCartDto,
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

  @Post('place-order')
  @UseGuards(JwtAuthGuard)
  @Public()
  async placeOrder(
    @Query('cart_id', ParseIntPipe) cartId: number,
    @Body() body: PlaceOrderDto,
    @Request() request,
  ) {
    const cart = await this.checkoutCartService.placeOrder(
      request.user,
      cartId,
      body,
    );
    return new ResponseSuccess('Success', cart);
  }
}
