import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { MakeupProduct } from 'src/makeup-products/entities/makeup-product.entity';
import { Min } from 'class-validator';

export enum PaymentStatus {
  PAID = 'Paid',
  REFUNDED = 'Refunded',
  FAILED = 'Failed',
}

@Entity()
export class OrderTrans {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.purchase_history, { onDelete: 'CASCADE' })
  client: User;

  @ManyToMany(() => MakeupProduct)
  @JoinTable()
  products: MakeupProduct[];

  @Column({ type: 'decimal' })
  @Min(0)
  total_amount: number;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PAID })
  payment_status: PaymentStatus;
}
