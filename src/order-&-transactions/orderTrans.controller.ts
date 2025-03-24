import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderTransService } from './orderTrans.service';
import { CreateOrderTransDto } from './dto/create-orderTrans.dto';
import { UpdateOrderTransDto } from './dto/update-orderTrans.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('orderTrans')
export class OrderTransController {
  constructor(private readonly orderTransService: OrderTransService) {}

  @Post()
  create(@Body() createOrderTransDto: CreateOrderTransDto) {
    return this.orderTransService.create(createOrderTransDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.orderTransService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.orderTransService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderTransDto) {
    return this.orderTransService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.orderTransService.remove(id);
  }
}
