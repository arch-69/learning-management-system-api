import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[UserModule, JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory(configService: ConfigService){
        return {
          secret:configService.get<string>('jwt.accessTokenSecret'),
          signOptions:{
            expiresIn:configService.get<number>('jwt.accessTokenExpiry')
          }
        }
      }
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
