import { Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  //@CurrentUser() user: User
  @Get()
  async getCurrentUserCart(@Query('id') userId: string) {
    return this.cartService.getCart(+userId);
  }

  @Post()
  async addToCart(
    @Query('userId') userId: string,
    @Query('productId') productId: string,
    @Query('quantity') quantity: string
  ) {
    return this.cartService.addToCart(+userId, +productId, +quantity);
  }

  @Patch()
  async updateItemQuantity(
    @Query('cartItemId') cartItemId: string,
    @Query('quantity') quantity: string
  ) {
    return this.cartService.updateItemQuantity(+cartItemId, +quantity)
  }

  @Delete()
  async deleteItemFromCart(@Query('cartItemId') cartItemId: string) {
    return this.cartService.deleteItem(+cartItemId)
  }

  @Delete()
  async cleanCart(@Query('userId') userId: string) {
    return this.cartService.deleteItems(+userId)
  }
}
