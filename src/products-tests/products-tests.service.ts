import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductsTestDto } from './dto/create-products-test.dto';
import { UpdateProductsTestDto } from './dto/update-products-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTest } from './entities/products-test.entity';
import { Repository } from 'typeorm';
import { MakeupProduct } from 'src/makeup-products/entities/makeup-product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsTestsService {
  constructor(
   @InjectRepository(ProductTest) private readonly producTestRepo: Repository<ProductTest>
  ,@InjectRepository(User) private readonly userRepo: Repository<User>
  ,@InjectRepository(MakeupProduct) private readonly makeupProductRepo: Repository<MakeupProduct>
){}


  async create(createProductsTestDto: CreateProductsTestDto): Promise<ProductTest> {
    const {testerId, productId, reaction, rating, survival_status} = createProductsTestDto;

    const tester = await this.userRepo.findOne({where: {id: testerId} });
    if(!tester) throw new NotFoundException(Tester with ID ${testerId} not found);

    const product = await this.makeupProductRepo.findOne({where: {id: productId} });
    if(!product) throw new NotFoundException(Product with ID ${productId} not found);

    const newTest = this.producTestRepo.create({
      tester,
      product,
      reaction,
      rating,
      survival_status,
    });

    return await this.producTestRepo.save(newTest);
  }

  async findAll(): Promise<ProductTest[]> {
    return await this.producTestRepo.find({relations: ['tester','product']});
  }

  async findOne(id: string): Promise<ProductTest> {
    const test = await this.producTestRepo.findOne({where: {id}, relations: ['tester','product'],})
    if(!test) throw new NotFoundException(Product test with ID ${id} not found or had been eliminated)
    return test;
  }

  async update(id: string, updateProductsTestDto: UpdateProductsTestDto): Promise<ProductTest> {
    const test = await this.findOne(id);
    Object.assign(test,updateProductsTestDto);

    return await this.producTestRepo.save(test);
  }

  async remove(id: string): Promise<{message: string}> {
    const test = await this.findOne(id)
    await this.producTestRepo.remove(test);
    return {message: 'Product eliminated'};
  }
}