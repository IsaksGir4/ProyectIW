import { PartialType } from '@nestjs/mapped-types';
import { CreateMakeupProductDto } from './create-makeup-product.dto';

export class UpdateMakeupProductDto extends PartialType(CreateMakeupProductDto) {}
