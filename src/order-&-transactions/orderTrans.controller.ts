import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderTransService } from './orderTrans.service';
import { CreateOrderTransDto } from './dto/create-orderTrans.dto';
import { UpdateOrderTransDto } from './dto/update-orderTrans.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderTrans } from './entities/orderTrans.entity';

@Controller('orders')
export class OrderTransController {
  constructor(private readonly orderTransService: OrderTransService) {}

  @Post()
  @Roles('admin','employee', 'client')
  @UseGuards(AuthGuard)
  async create(@Body() createOrderDto: CreateOrderTransDto): Promise<OrderTrans> {
    return this.orderTransService.create(createOrderDto);
  }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard)
  async findAll(): Promise<OrderTrans[]> {
    return this.orderTransService.findAll();
  }

  @Get(':id')
  @Roles('admin','employee', 'client')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<OrderTrans> {
    return this.orderTransService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderTransDto): Promise<OrderTrans> {
    return this.orderTransService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    await this.orderTransService.remove(id);
  }
}
