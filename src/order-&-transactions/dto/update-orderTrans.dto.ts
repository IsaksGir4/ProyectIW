import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-orderTrans.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
