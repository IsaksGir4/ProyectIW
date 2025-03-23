import { Module } from '@nestjs/common';
import { ProductsTestsService } from './products-tests.service';
import { ProductsTestsController } from './products-tests.controller';

@Module({
  controllers: [ProductsTestsController],
  providers: [ProductsTestsService],
})
export class ProductsTestsModule {}
