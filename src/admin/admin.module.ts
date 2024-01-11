import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ProductService } from "../product/product.service";
import { PrismaService } from "../database/prisma.service";

@Module({
  controllers: [AdminController],
  providers: [AdminService, ProductService, PrismaService],
})
export class AdminModule {}
