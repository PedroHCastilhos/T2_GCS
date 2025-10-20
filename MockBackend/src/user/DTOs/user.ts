import {IsEmail, IsNotEmpty, IsNumber } from "class-validator"

export class SignupDTO {
    @IsNotEmpty()
        name: string;
    @IsEmail()
        email: string;
    @IsNotEmpty()
        password: string;
    @IsNumber()
        level: number;
}

export class SigninDTO {
    @IsEmail()
        email: string;
    @IsNotEmpty()
        password: string;
}