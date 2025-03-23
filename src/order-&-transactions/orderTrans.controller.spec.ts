import { Test, TestingModule } from '@nestjs/testing';
import { OrderTransController } from './orderTrans.controller';
import { OrderTransService } from './orderTrans.service';

describe('OrderTransController', () => {
  let controller: OrderTransController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderTransController],
      providers: [OrderTransService],
    }).compile();

    controller = module.get<OrderTransController>(OrderTransController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
