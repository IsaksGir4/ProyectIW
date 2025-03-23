import { Injectable } from '@nestjs/common';
import { CreateProductsTestDto } from './dto/create-products-test.dto';
import { UpdateProductsTestDto } from './dto/update-products-test.dto';

@Injectable()
export class ProductsTestsService {
  create(createProductsTestDto: CreateProductsTestDto) {
    return 'This action adds a new productsTest';
  }

  findAll() {
    return `This action returns all productsTests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsTest`;
  }

  update(id: number, updateProductsTestDto: UpdateProductsTestDto) {
    return `This action updates a #${id} productsTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsTest`;
  }
}
