import { IsNotEmpty, IsNumber } from "class-validator"

export class SignupLocal {
    @IsNotEmpty()
        descricao: string
    @IsNumber()
        acessLevel: number
}