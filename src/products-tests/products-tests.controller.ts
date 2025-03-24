import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsTestsService } from './products-tests.service';
import { CreateProductsTestDto } from './dto/create-products-test.dto';
import { UpdateProductsTestDto } from './dto/update-products-test.dto';
import { ProductTest } from './entities/products-test.entity';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products-tests')
export class ProductsTestsController {
  constructor(private readonly productsTestsService: ProductsTestsService) {}

  @Post()
  @Roles('admin', 'employee')
  @UseGuards(AuthGuard)
  async create(@Body() createProductsTestDto: CreateProductsTestDto): Promise<ProductTest> {
    return this.productsTestsService.create(createProductsTestDto);
  }

  @Get()
  @Roles('admin', 'employee')
  @UseGuards(AuthGuard)
  async findAll(): Promise<ProductTest[]> {
    return this.productsTestsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'employee','tester')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<ProductTest> {
    return this.productsTestsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'employee')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateProductsTestDto: UpdateProductsTestDto): Promise<ProductTest> {
    return this.productsTestsService.update(id, updateProductsTestDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    await this.productsTestsService.remove(id);
  }
}

