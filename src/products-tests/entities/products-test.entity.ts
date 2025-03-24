import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MakeupProduct } from 'src/makeup-products/entities/makeup-product.entity';
import { IsInt, IsUUID, Max, Min, IsBoolean, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class ProductTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.productTests, { onDelete: 'CASCADE', eager: true })
  tester: User;

  @ManyToOne(() => MakeupProduct, (product) => product.productTests, { onDelete: 'CASCADE', eager: true })
  product: MakeupProduct;

  @Column({ type: 'text' })
  @IsString()
  reaction: string; 

  @Column({ type: 'int', default: 5 })
  @IsInt()
  @Min(1)
  @Max(10)
  rating: number; 

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  survival_status: boolean;
}
