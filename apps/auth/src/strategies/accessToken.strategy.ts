import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { JwtPayload } from "libs/common";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService, private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_ACCESS_SECRET'),
            ignoreExpiration: false,
        })
    }

    async validate({ id }: JwtPayload) {
        try {
            return await this.usersService.getUserById(id)
        } catch (err) {
            throw new UnauthorizedException();
        }
    }
}