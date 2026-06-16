import { InjectModel } from "@nestjs/mongoose";
import { User} from "./schema/user.schema";
import { Model } from "mongoose";
import { ConflictException, Injectable } from "@nestjs/common";
import {CreatedDTO } from "./dto/user.dto";
import { UserRegisterResponse } from "src/common/user.response";

Injectable()
export class UserRepository{
    constructor(@InjectModel(User.name) private user : Model<User> ){}

    async create(createDTO: CreatedDTO): Promise<User> {
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
}