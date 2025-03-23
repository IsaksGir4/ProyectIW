import { Module } from '@nestjs/common';
import { OrderService } from './orderTrans.service';
import { OrderController } from './orderTrans.controller';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
