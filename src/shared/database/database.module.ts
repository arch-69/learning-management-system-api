import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[
        MongooseModule.forRootAsync({
            inject:[ConfigService],
            useFactory(configService:ConfigService) {
                return {
                    uri:configService.get<string>('database.uri')
                }
            },
        })
    ]
})
export class DatabaseModule {}
