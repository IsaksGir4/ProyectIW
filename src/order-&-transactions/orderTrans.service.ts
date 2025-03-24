import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderTransDto } from './dto/create-orderTrans.dto';
import { UpdateOrderTransDto } from './dto/update-orderTrans.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderTrans } from './entities/orderTrans.entity';
import { User } from 'src/users/entities/user.entity';
import { MakeupProduct } from 'src/makeup-products/entities/makeup-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderTransService {
  constructor(
    @InjectRepository(OrderTrans) private orderRepo: Repository<OrderTrans>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(MakeupProduct) private productRepo: Repository<MakeupProduct>,
  ) {}

  async create(createOrderDto: CreateOrderTransDto): Promise<OrderTrans> {
    const { clientId, productIds, total_amount, payment_status } = createOrderDto;

    const client = await this.userRepo.findOne({ where: { id: clientId } });
    if (!client) throw new NotFoundException(Client with ID ${clientId} not found);


    const products = await this.productRepo.findByIds(productIds);
    if (products.length !== productIds.length) throw new NotFoundException(One or more products not found);

    const newOrder = this.orderRepo.create({
      client,
      products,
      total_amount,
      payment_status,
    });

    return await this.orderRepo.save(newOrder);
  }

  async findAll(): Promise<OrderTrans[]> {
    return await this.orderRepo.find({ relations: ['client', 'products'] });
  }

  async findOne(id: string): Promise<OrderTrans> {
    const order = await this.orderRepo.findOne({where: { id },
      relations: ['client', 'products'],
    });
    if (!order) throw new NotFoundException(Order with ID ${id} not found);
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderTransDto): Promise<OrderTrans> {
    const order = await this.findOne(id);
    Object.assign(order, updateOrderDto);
    return await this.orderRepo.save(order);
  }

  async remove(id: string): Promise<{ message: string }> {
    const order = await this.findOne(id);
    await this.orderRepo.remove(order);
    return { message: 'Order deleted' };
  }
}