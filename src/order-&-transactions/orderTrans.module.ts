import { Module } from '@nestjs/common';
import { OrderTransService } from './orderTrans.service';
import { OrderTransController } from './orderTrans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTrans } from './entities/orderTrans.entity';
import { User } from 'src/users/entities/user.entity';
import { MakeupProduct } from 'src/makeup-products/entities/makeup-product.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderTrans, User, MakeupProduct]), AuthModule],
  controllers: [OrderTransController],
  providers: [OrderTransService],
})
export class OrderTransModule {}
