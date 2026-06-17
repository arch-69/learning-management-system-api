import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Mongoose, Types } from "mongoose";
import { ObjectUnsubscribedError } from "rxjs";

export type UserDocument = User & Document;

export enum UserRole {
    STUDENT = "student",
    ADMIN = "admin"

}

@Schema({timestamps:true})
export class User{
    @Prop({required:true, type:String, trim:true})
    name: string | undefined;

    @Prop({required:true, unique:true, type:String})
    email: string | undefined;

    @Prop({required: true, type:String})
    password: string | undefined;

    @Prop({type:String, enum:UserRole, default:UserRole.STUDENT})
    role?: UserRole = UserRole.STUDENT;
}

export const UserSchema = SchemaFactory.createForClass(User);
