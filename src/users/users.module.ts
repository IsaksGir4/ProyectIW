import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { OrderTrans } from 'src/order-&-transactions/entities/orderTrans.entity';
import { ProductTest } from 'src/products-tests/entities/products-test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, OrderTrans, ProductTest]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
