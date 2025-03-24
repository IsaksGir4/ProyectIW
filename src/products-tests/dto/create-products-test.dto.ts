import { IsBoolean, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateProductsTestDto {
    @IsString()
    readonly reaction : string;

    @IsNumber()
    @Min(1)
    @Max(10)
    readonly rating : number;

    @IsBoolean()
    readonly survival_status : boolean;
}
