import { Test, TestingModule } from '@nestjs/testing';
import { OrderTransService } from './orderTrans.service';

describe('OrderTransService', () => {
  let service: OrderTransService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTransService],
    }).compile();

    service = module.get<OrderTransService>(OrderTransService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
