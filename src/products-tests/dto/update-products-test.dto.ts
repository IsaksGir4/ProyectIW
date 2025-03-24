import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsTestDto } from './create-products-test.dto';

export class UpdateProductsTestDto extends PartialType(CreateProductsTestDto) {}

