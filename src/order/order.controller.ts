import { Controller, Delete, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @Post()
  async createOrder() {
    return this.orderService.createOrder();
  }

  @Delete()
  async deleteOrder(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }
}
