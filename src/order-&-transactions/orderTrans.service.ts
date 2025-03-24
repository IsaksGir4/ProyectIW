import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderTransDto } from './dto/create-orderTrans.dto';
import { UpdateOrderTransDto } from './dto/update-orderTrans.dto';
import { OrderTrans } from './entities/orderTrans.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderTransService {
constructor(@InjectRepository(OrderTrans) private orderRepo : Repository<OrderTrans>){}

  create(createOrderTransDto: CreateOrderTransDto) {
    const order = this.orderRepo.create(createOrderTransDto);
    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find();
  }

   async findOne(id: string) {
    const order = await this.orderRepo.findOne({where: {id}});
        if(!order) throw new NotFoundException('Order Not found');
        return order;
  }

  async update(id: string, updateOrderTransDto: UpdateOrderTransDto) {
    await this.orderRepo.update(id,updateOrderTransDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    await this.orderRepo.remove(order);
    return {message: 'Order eliminated'};
  }
}
