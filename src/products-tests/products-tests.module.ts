import { Module } from '@nestjs/common';
import { ProductsTestsService } from './products-tests.service';
import { ProductsTestsController } from './products-tests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsTest } from './entities/products-test.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsTest]), AuthModule],
  controllers: [ProductsTestsController],
  providers: [ProductsTestsService],
})
export class ProductsTestsModule {}
