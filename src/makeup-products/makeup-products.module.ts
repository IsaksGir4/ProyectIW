import { Module } from '@nestjs/common';
import { MakeupProductsService } from './makeup-products.service';
import { MakeupProductsController } from './makeup-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MakeupProduct } from './entities/makeup-product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProductTest } from 'src/products-tests/entities/products-test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MakeupProduct, ProductTest]), AuthModule],
  controllers: [MakeupProductsController],
  providers: [MakeupProductsService],
})
export class MakeupProductsModule {}
