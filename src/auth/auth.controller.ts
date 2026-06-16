import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { CreatedDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post("register")
    register(@Body() createDTO: CreatedDTO){
        return this.authService.register(createDTO);
        
    }
}
