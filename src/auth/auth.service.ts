import { Injectable } from '@nestjs/common';
import { UserRegisterResponse } from 'src/common/user.response';
import { CreatedDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}
    
    async register(createDTO: CreatedDTO):Promise<UserRegisterResponse> {

        const hashPassword = await bcrypt.hash(createDTO.password as string, 10);

        createDTO.password = hashPassword;

        const res = await this.userService.create(createDTO);

        return{
            // message:"user registered successfully",
            user:{
                name: res.name,
                email: res.email,
                role: res.role ,
            },
            tokens:{
                accessToken:"",
                refreshToken:""
            }
        };
        
    }
}
