import { IsBase64, IsEmail, IsNotEmpty, IsNumber } from "class-validator"

export class SignupDTO {
    @IsNotEmpty()
        name: string;
    @IsEmail()
        email: string;
    @IsNotEmpty()
        password: string;
    @IsNumber()
        level: number;
    @IsBase64()
        profile_image: string;
}

export class SigninDTO {
    @IsEmail()
        email: string;
    @IsNotEmpty()
        password: string;
}