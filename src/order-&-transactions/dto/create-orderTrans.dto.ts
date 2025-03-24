import { IsDecimal, IsEnum } from "class-validator";
import { PaymentStat } from "../entities/orderTrans.entity";

export class CreateOrderTransDto {
    @IsDecimal()
    readonly total_amount : number

    @IsEnum(PaymentStat)
    readonly payment_status : PaymentStat
}
