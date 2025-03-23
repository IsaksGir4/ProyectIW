import { Injectable } from '@nestjs/common';
import { CreateMakeupProductDto } from './dto/create-makeup-product.dto';
import { UpdateMakeupProductDto } from './dto/update-makeup-product.dto';

@Injectable()
export class MakeupProductsService {
  create(createMakeupProductDto: CreateMakeupProductDto) {
    return 'This action adds a new makeupProduct';
  }

  findAll() {
    return `This action returns all makeupProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} makeupProduct`;
  }

  update(id: number, updateMakeupProductDto: UpdateMakeupProductDto) {
    return `This action updates a #${id} makeupProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} makeupProduct`;
  }
}
