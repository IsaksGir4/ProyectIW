import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsTestsService } from './products-tests.service';
import { CreateProductsTestDto } from './dto/create-products-test.dto';
import { UpdateProductsTestDto } from './dto/update-products-test.dto';

@Controller('products-tests')
export class ProductsTestsController {
  constructor(private readonly productsTestsService: ProductsTestsService) {}

  @Post()
  create(@Body() createProductsTestDto: CreateProductsTestDto) {
    return this.productsTestsService.create(createProductsTestDto);
  }

  @Get()
  findAll() {
    return this.productsTestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsTestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsTestDto: UpdateProductsTestDto) {
    return this.productsTestsService.update(+id, updateProductsTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsTestsService.remove(+id);
  }
}
