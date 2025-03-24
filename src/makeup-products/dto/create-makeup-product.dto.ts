import { IsEnum, IsNotEmpty, IsNumber, Min, Max, IsString } from 'class-validator';
import { ProductCategory } from '../entities/makeup-product.entity';

export class CreateMakeupProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsNotEmpty()
  @IsString()
  warehouse_location: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  durability_score: number;
}
