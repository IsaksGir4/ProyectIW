import { IsBoolean, IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateProductsTestDto {
    
    @IsUUID()
    @IsNotEmpty()
    testerId: string;

    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsString()
    @IsNotEmpty()
    reaction: string;

    @IsInt()
    @Min(1)
    @Max(10)
    rating: number;

    @IsBoolean()
    survival_status: boolean;
}
