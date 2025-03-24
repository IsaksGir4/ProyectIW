import { Module } from '@nestjs/common';
import { ProductsTestsService } from './products-tests.service';
import { ProductsTestsController } from './products-tests.controller';
import { ProductTest } from './entities/products-test.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MakeupProduct } from 'src/makeup-products/entities/makeup-product.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTest, User, MakeupProduct]), AuthModule],
  controllers: [ProductsTestsController],
  providers: [ProductsTestsService],
})
export class ProductsTestsModule {}
