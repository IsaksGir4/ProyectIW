import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MakeupProductsService } from './makeup-products.service';
import { CreateMakeupProductDto } from './dto/create-makeup-product.dto';
import { UpdateMakeupProductDto } from './dto/update-makeup-product.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { MakeupProduct } from './entities/makeup-product.entity';


@Controller('makeup-products')
export class MakeupProductsController {
  constructor(private readonly makeupProductsService: MakeupProductsService) {}

  @Post()
  @Roles('admin', 'employee')
  @UseGuards(AuthGuard)
  async create(@Body() createMakeupProductDto: CreateMakeupProductDto): Promise<MakeupProduct> {
    return this.makeupProductsService.create(createMakeupProductDto);
  }

  @Get()
  @Roles('admin', 'employee')
  @UseGuards(AuthGuard)
  async findAll(): Promise<MakeupProduct[]> {
    return this.makeupProductsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'employee')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<MakeupProduct> {
    return this.makeupProductsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'employee')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateMakeupProductDto: UpdateMakeupProductDto): Promise<MakeupProduct> {
    return this.makeupProductsService.update(id, updateMakeupProductDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<{message: string}> {
    return this.makeupProductsService.remove(id);
  }
}
