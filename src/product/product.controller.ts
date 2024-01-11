import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(
    @Query('sortBy') sortBy: string,
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
    @Query('order') order: string,
  ) {
    return this.productService.products({
      where: {
        price: {
          gte: +minPrice || 0,
          lte: +maxPrice || Number.MAX_SAFE_INTEGER,
        },
      },
      orderBy: {
        [sortBy]: order,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.product({id: +id});
  }
}
