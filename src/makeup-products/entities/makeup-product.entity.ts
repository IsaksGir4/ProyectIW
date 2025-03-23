import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductsTest } from 'src/products-tests/entities/products-test.entity';

@Entity()
export class MakeUpProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column({ type: 'int', default: 0 })
  durability_score: number;

//   @OneToMany(() => ProductsTest, (test) => test.product)
//   tests: ProductsTest[];
}
