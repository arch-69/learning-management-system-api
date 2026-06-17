import { IsEmail, IsEmpty, IsOptional, Max, MaxLength, Min, MinLength} from "class-validator";
import { UserRole } from "../schema/user.schema"

export class CreatedDTO{
    @MinLength(2)
    @MaxLength(30)
    name:string | undefined;

    @IsEmail()
    email:string | undefined;

    @MinLength(8, {message:"password length must be 8 or greater than 8"})
    password:string | undefined;

    @IsOptional()
    role?: UserRole ;
}