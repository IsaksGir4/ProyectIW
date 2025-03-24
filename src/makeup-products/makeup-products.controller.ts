import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MakeupProductsService } from './makeup-products.service';
import { CreateMakeupProductDto } from './dto/create-makeup-product.dto';
import { UpdateMakeupProductDto } from './dto/update-makeup-product.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('makeup-products')
export class MakeupProductsController {
  constructor(private readonly makeupProductsService: MakeupProductsService) {}

  @Post()
  @Roles('admin', 'employee')
  @UseGuards(AuthGuard)
  create(@Body() createMakeupProductDto: CreateMakeupProductDto) {
    return this.makeupProductsService.create(createMakeupProductDto);
  }

  @Get()
  @Roles('admin', 'employee')
  @UseGuards(AuthGuard)
  findAll() {
    return this.makeupProductsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'employee')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.makeupProductsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'employee')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateMakeupProductDto: UpdateMakeupProductDto) {
    return this.makeupProductsService.update(id, updateMakeupProductDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.makeupProductsService.remove(id);
  }
}
