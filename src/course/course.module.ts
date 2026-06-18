import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './entities/course.entity';
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([
    {
      name:Course.name,
      schema:CourseSchema
    }
  ]),
  AuthModule,
  JwtModule
],
  controllers: [CourseController],
  providers: [CourseService],

})
export class CourseModule {}
