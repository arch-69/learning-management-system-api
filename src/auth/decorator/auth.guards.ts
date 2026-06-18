import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private readonly configService: ConfigService, private readonly jwtService:JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = this.extractAuthorizationHeader(request);
        console.log(token);

        if(!token) throw new UnauthorizedException();

        console.log(this.configService.get<string>("jwt.accessTokenSecret"));

        const payload = this.jwtService.verify(token, {secret: this.configService.get<string>("jwt.accessTokenSecret")});

        request.user = payload;

        return true;
    }

    extractAuthorizationHeader(request: {headers: Record<string, string>}) : string | undefined {
        if(request.headers?.authorization && request.headers?.authorization.startsWith("Bearer ")){
         return request.headers?.authorization.split(" ")[1];
        }
        return undefined;
    }
}