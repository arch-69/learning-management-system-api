import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type CourseDocument = Course | Document;

@Schema({timestamps:true})
export class Course {
    @Prop({type:String, required:true})
    name?:string;

    @Prop({type:String})
    description?:string;

    @Prop({type:Number, required:true})
    duration?:number;

    @Prop({type:Types.ObjectId, required:true})
    createdBy?:Types.ObjectId;

    @Prop({type:Types.ObjectId, required:true})
    price?:number;

}

export const CourseSchema = SchemaFactory.createForClass(Course);