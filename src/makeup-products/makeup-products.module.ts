import { Module } from '@nestjs/common';
import { MakeupProductsService } from './makeup-products.service';
import { MakeupProductsController } from './makeup-products.controller';

@Module({
  controllers: [MakeupProductsController],
  providers: [MakeupProductsService],
})
export class MakeupProductsModule {}
