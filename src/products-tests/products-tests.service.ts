import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductsTestDto } from './dto/create-products-test.dto';
import { UpdateProductsTestDto } from './dto/update-products-test.dto';
import { ProductsTest } from './entities/products-test.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ProductsTestsService {
  constructor(@InjectRepository(ProductsTest) private ptestsRepo: Repository<ProductsTest>){}

  async create(createProductsTestDto: CreateProductsTestDto) {
    const ptest = this.ptestsRepo.create(createProductsTestDto);
    return this.ptestsRepo.save(ptest);
  }

  findAll() {
    return this.ptestsRepo.find();
  }

  async findOne(id: string) {
    const ptest = await this.ptestsRepo.findOne({where: {id}});
    if(!ptest) throw new NotFoundException('Product test not found or had been eliminated')
    return ptest;
  }

  async update(id: string, updateProductsTestDto: UpdateProductsTestDto) {
    await this.ptestsRepo.update(id,updateProductsTestDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const ptest = await this.findOne(id);
    await this.ptestsRepo.remove(ptest);
    return {messasge: 'The Product test has been eliminated'}
  }
}
