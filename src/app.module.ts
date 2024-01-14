import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { PrismaService } from "./database/prisma.service";
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';


@Module({
  imports: [ProductModule, AdminModule, CartModule, OrderModule],
  controllers: [AppController, ProductController, AdminController],
  providers: [AppService, ProductService, PrismaService],
})
export class AppModule {}
