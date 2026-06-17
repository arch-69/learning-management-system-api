import { Injectable } from '@nestjs/common';
import { TokenPair, UserRegisterResponse } from 'src/common/user.response';
import { CreatedDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){}
    
    async register(createDTO: CreatedDTO):Promise<UserRegisterResponse> {
        const hashPassword = await bcrypt.hash(createDTO.password as string, 10);
        createDTO.password = hashPassword;
        const res = await this.userService.create(createDTO);
        const tokens = await this.generateToken(res._id.toHexString(), res.role as string);
        return{
            // message:"user registered successfully",
            user:{
                name: res.name,
                email: res.email,
                role: res.role ,
            },
            tokens
        };
    }

    async generateToken(sub:string, role:string):Promise<TokenPair>{
        const accessToken = await this.jwtService.signAsync({sub, role});
        const refreshToken = this.jwtService.sign(
            {sub},
            {
                secret: this.configService.get<string>("jwt.refreshTokenSecret"),
                expiresIn: this.configService.get<number>("jwt.refreshTokenExpiry")
            }
           
        )

        return {
            accessToken,
            refreshToken
        }
    }
}
