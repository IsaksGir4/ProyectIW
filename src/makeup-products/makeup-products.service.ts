import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMakeupProductDto } from './dto/create-makeup-product.dto';
import { UpdateMakeupProductDto } from './dto/update-makeup-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MakeUpProduct } from './entities/makeup-product.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class MakeupProductsService {
constructor(@InjectRepository(MakeUpProduct) private productRepo: Repository<MakeUpProduct>){}

  create(createMakeupProductDto: CreateMakeupProductDto) {
    const product = this.productRepo.create(createMakeupProductDto);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({where: {id}});
    if(!product) throw new NotFoundException('Product Not found');
    return product;
  }

  async update(id: number, updateMakeupProductDto: UpdateMakeupProductDto) {
    await this.productRepo.update(id,updateMakeupProductDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
    return {message: 'Product eliminated'};
  }
}
