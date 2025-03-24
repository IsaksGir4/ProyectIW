import { Module } from '@nestjs/common';
import { MakeupProductsService } from './makeup-products.service';
import { MakeupProductsController } from './makeup-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MakeUpProduct } from './entities/makeup-product.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MakeUpProduct]), AuthModule],
  controllers: [MakeupProductsController],
  providers: [MakeupProductsService],
})
export class MakeupProductsModule {}
