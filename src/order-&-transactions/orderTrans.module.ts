import { Module } from '@nestjs/common';
import { OrderTransService } from './orderTrans.service';
import { OrderTransController } from './orderTrans.controller';
import { OrderTrans } from './entities/orderTrans.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([OrderTrans]), AuthModule],
  controllers: [OrderTransController],
  providers: [OrderTransService],
})
export class OrderTransModule {}
