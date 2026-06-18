import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument} from "./schema/user.schema";
import { Model } from "mongoose";
import { ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {CreatedDTO } from "./dto/user.dto";
import { UserRegisterResponse } from "src/common/user.response";

Injectable()
export class UserRepository{
    constructor(@InjectModel(User.name) private user : Model<User> ){}

    async create(createDTO: CreatedDTO): Promise<UserDocument> {
        try{
        return await this.user.create(createDTO);
        }catch(error : unknown){
            const Duplicate_Code = 11000;
            const e  = error as {code :number};
            if(e.code == Duplicate_Code){
             throw new ConflictException("User already exist");
            }
            throw error;
        }
    }

    async findByEmail(email:string): Promise<UserDocument> {
        try{
            return await this.user.findOne({email:email}).exec() as UserDocument;
        }catch(err){
            throw new NotFoundException();
        }
    }
}