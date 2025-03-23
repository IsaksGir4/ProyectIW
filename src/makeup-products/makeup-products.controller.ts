import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MakeupProductsService } from './makeup-products.service';
import { CreateMakeupProductDto } from './dto/create-makeup-product.dto';
import { UpdateMakeupProductDto } from './dto/update-makeup-product.dto';

@Controller('makeup-products')
export class MakeupProductsController {
  constructor(private readonly makeupProductsService: MakeupProductsService) {}

  @Post()
  create(@Body() createMakeupProductDto: CreateMakeupProductDto) {
    return this.makeupProductsService.create(createMakeupProductDto);
  }

  @Get()
  findAll() {
    return this.makeupProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.makeupProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMakeupProductDto: UpdateMakeupProductDto) {
    return this.makeupProductsService.update(+id, updateMakeupProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.makeupProductsService.remove(+id);
  }
}
