import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsTestsService } from './products-tests.service';
import { CreateProductsTestDto } from './dto/create-products-test.dto';
import { UpdateProductsTestDto } from './dto/update-products-test.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products-tests')
export class ProductsTestsController {
  constructor(private readonly productsTestsService: ProductsTestsService) {}

  @Post()
  create(@Body() createProductsTestDto: CreateProductsTestDto) {
    return this.productsTestsService.create(createProductsTestDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.productsTestsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.productsTestsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateProductsTestDto: UpdateProductsTestDto) {
    return this.productsTestsService.update(id, updateProductsTestDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.productsTestsService.remove(id);
  }
}
