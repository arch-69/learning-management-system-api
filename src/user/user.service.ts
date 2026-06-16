import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreatedDTO } from './dto/user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(private readonly userRepository:UserRepository){}

    create(createDTO:CreatedDTO):Promise<User>{
        return this.userRepository.create(createDTO);
    }
}
