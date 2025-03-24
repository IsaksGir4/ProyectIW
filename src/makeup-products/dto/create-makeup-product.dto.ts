import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateMakeupProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  durability_score: number;
}