import { MakeUpProduct } from "src/makeup-products/entities/makeup-product.entity";
import { Entity, PrimaryGeneratedColumn, Column, Collection} from "typeorm";

export enum PaymentStat {
    PAID = 'paid',
    REFUNDED = 'refunded',
    FAILED = 'failed'
}

@Entity('orderTrans')
export class OrderTrans {

@PrimaryGeneratedColumn('uuid')
id : string;

@Column('uuid')
client_id : string

@Column()
products : MakeUpProduct

@Column('decimal')
total_amount : number

@Column({ type: 'enum', enum: PaymentStat })
payment_status : PaymentStat

}
