import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderTransDto } from './create-orderTrans.dto';

export class UpdateOrderTransDto extends PartialType(CreateOrderTransDto) {}
