import { Injectable } from '@nestjs/common';
import { PrismaService } from "../database/prisma.service";
import { ShoppingCartItem } from "@prisma/client";

interface ShoppingCart {
  id: number;
  userId: number;
  items: ShoppingCartItem[];
}


@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {
  }

  async getCart(userId: number): Promise<ShoppingCart> {
    const cart = await this.prisma.shoppingCart.findUnique({
        where: {
          userId,
        },
        include: {items: {include: {product: true}}}
      }
    )

    if (!cart) {
      throw new Error('Cart not found');
    }

    return cart;
  }

  async addToCart(userId: number, productId: number, quantity: number) {
    const cart = await this.getCart(userId);

    return this.prisma.shoppingCartItem.create({
      data: {
        productId,
        quantity,
        shoppingCartId: cart.id,
      },
    });
  }

  async updateItemQuantity(id: number, quantity: number) {
    return this.prisma.shoppingCartItem.update({
      where: {
        id
      },
      data: {
        quantity: quantity
      },
    })
  }

  async deleteItem(id: number) {
    return this.prisma.shoppingCartItem.delete({
      where: {
        id,
      }
    })
  }

  async deleteItems(userId: number) {
    const cart = await this.getCart(userId);
    return this.prisma.shoppingCartItem.deleteMany({
      where: {
        shoppingCartId: cart.id
      }
    })
  }
}
