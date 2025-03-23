import { Injectable } from '@nestjs/common';
import { CreateOrderTransDto } from './dto/create-orderTrans.dto';
import { UpdateOrderTransDto } from './dto/update-orderTrans.dto';

@Injectable()
export class OrderTransService {
  create(createOrderDto: CreateOrderTransDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderTransDto: UpdateOrderTransDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
