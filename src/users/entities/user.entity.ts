import { OrderTrans } from 'src/order-&-transactions/entities/orderTrans.entity';
import { ProductTest } from 'src/products-tests/entities/products-test.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  TESTER = 'tester',
  EMPLOYEE = 'employee',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

  @OneToMany(() => OrderTrans,(orderTrans) => orderTrans.client)
  purchase_history: OrderTrans[];

  @Column({type: 'boolean', default: false})
  test_subject_status: boolean;

  @Column({type: 'text', nullable: true})
  allergic_reactions: string;

  @OneToMany(() => ProductTest, (productTest) => productTest.tester)
  productTests: ProductTest[];
}