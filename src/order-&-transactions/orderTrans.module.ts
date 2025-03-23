import { Module } from '@nestjs/common';
import { OrderTransService } from './orderTrans.service';
import { OrderTransController } from './orderTrans.controller';

@Module({
  controllers: [OrderTransController],
  providers: [OrderTransService],
})
export class OrderTransModule {}
