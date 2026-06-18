import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreatedDTO } from './dto/user.dto';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(private readonly userRepository:UserRepository){}

    create(createDTO:CreatedDTO):Promise<UserDocument>{
        return this.userRepository.create(createDTO);
    }

    findByEmail(email:string):Promise<UserDocument>{
        return this.userRepository.findByEmail(email);
    }
}
