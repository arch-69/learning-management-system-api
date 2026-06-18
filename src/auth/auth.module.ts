import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './decorator/auth.guards';
import { APP_GUARD } from '@nestjs/core';
import jwtConfig from 'src/config/jwt.config';

@Module({
  imports: [

    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load:[
        jwtConfig
      ]
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get<string>('jwt.accessTokenSecret'),
          signOptions: {
            expiresIn: configService.get<number>('jwt.accessTokenExpiry')
          }
        }
      }
    })],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule { }
