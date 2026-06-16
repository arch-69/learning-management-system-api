import { UserRole } from "../schema/user.schema"

export class CreatedDTO{
    name:string | undefined;
    email:string | undefined;
    password:string | undefined;
    role?: UserRole ;
}