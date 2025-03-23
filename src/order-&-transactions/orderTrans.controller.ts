import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderTransService } from './orderTrans.service';
import { CreateOrderTransDto } from './dto/create-orderTrans.dto';
import { UpdateOrderTransDto } from './dto/update-orderTrans.dto';

@Controller('order')
export class OrderTransController {
  constructor(private readonly orderTransService: OrderTransService) {}

  @Post()
  create(@Body() createOrderTransDto: CreateOrderTransDto) {
    return this.orderTransService.create(createOrderTransDto);
  }

  @Get()
  findAll() {
    return this.orderTransService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderTransService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderTransDto) {
    return this.orderTransService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderTransService.remove(+id);
  }
}
