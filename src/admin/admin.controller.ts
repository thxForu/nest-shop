import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ProductService } from "../product/product.service";
import { Product } from "@prisma/client";

@Controller('admin')
export class AdminController {
  constructor(private readonly productService: ProductService) {}

  @Post('products')
  create(@Body() data: Product) {
    return this.productService.createProduct(data);
  }

  @Put('products/:id')
  updateProduct(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productService.updateProduct({where: {id: +id}, data: product});
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct({id: +id});
  }
}
