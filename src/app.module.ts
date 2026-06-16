import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, UserModule, ConfigModule.forRoot({
    isGlobal:true,
    load:[
      appConfig,
      databaseConfig
    ]
  }),
  DatabaseModule,
],
})
export class AppModule {}
