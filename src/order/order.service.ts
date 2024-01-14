import { Injectable } from '@nestjs/common';
import { CartService } from "../cart/cart.service";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private cartService: CartService) {
  }

  async createOrder() {
    const cart = await this.cartService.getCart(1);

    const order = await this.prisma.order.create({data: {userId: cart.userId}});
    const orderItems = cart.items.map(({quantity, productId}) => ({
      quantity,
      productId,
      orderId: order.id
    }))
    const createdOrderItems = await this.prisma.orderItem.createMany({data: orderItems});
    await this.prisma.shoppingCartItem.deleteMany({where: {shoppingCartId: cart.id}});

    return createdOrderItems;
  }

  async deleteOrder(id: number) {
    return this.prisma.order.delete({where: {id: id, userId: 1}});
  }
}
