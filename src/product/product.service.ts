import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({data});
  }

  async product(product: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.findUnique({where: product});
  }

  async products(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }) {
    const {skip, take, cursor, where, orderBy} = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }


  async updateProduct(params: { where: Prisma.ProductWhereUniqueInput, data: Prisma.ProductUpdateInput }) {
    const {where, data} = params;
    return this.prisma.product.update({data, where});
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.delete({where});
  }
}
