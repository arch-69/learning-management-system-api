import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { CreatedDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty } from 'class-validator';


export class LoginDTO{

    @IsEmail()
    email?:string

    @IsNotEmpty()
    password?:string
}


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post("register")
    register(@Body() createDTO: CreatedDTO){
        return this.authService.register(createDTO);
    }

    @Post("login")
    login(@Body() loginDTO: LoginDTO){
        return this.authService.login(loginDTO);
    }
}
