import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MakeupProductsModule } from './makeup-products/makeup-products.module';
import { ProductsTestsModule } from './products-tests/products-tests.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UsersModule, MakeupProductsModule, ProductsTestsModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
