import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMakeupProductDto } from './dto/create-makeup-product.dto';
import { UpdateMakeupProductDto } from './dto/update-makeup-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MakeupProduct } from './entities/makeup-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MakeupProductsService {
  constructor(@InjectRepository(MakeupProduct) private productRepo: Repository<MakeupProduct>) {}

  async create(createMakeupProductDto: CreateMakeupProductDto): Promise<MakeupProduct> {
    const product = this.productRepo.create(createMakeupProductDto);
    return this.productRepo.save(product);
  }

  async findAll(): Promise<MakeupProduct[]> {
    return this.productRepo.find();
  }

  async findOne(id: string): Promise<MakeupProduct> {
    const product = await this.productRepo.findOne({ where: { id }, relations: ['productTest'] });
    if (!product) throw new NotFoundException('Product Not found or had been eliminated');
    return product;
  }

  async update(id: string, updateMakeupProductDto: UpdateMakeupProductDto): Promise<MakeupProduct> {
    await this.productRepo.update(id, updateMakeupProductDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
    return { message: 'Product eliminated' };
  }
}
