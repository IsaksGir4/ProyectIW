import { PrimaryGeneratedColumn, Entity, Column,  } from "typeorm";

@Entity('products-tests')
export class ProductsTest {

@PrimaryGeneratedColumn('uuid')
id: string;

@Column('uuid')
tester_id : string;

@Column('uuid')
product_id : string;

@Column('text',{ nullable : false })
reaction : string;  

@Column('int',{ nullable: false })
rating : number;  

@Column('boolean', { nullable : false })
survival_status : boolean;  
}
