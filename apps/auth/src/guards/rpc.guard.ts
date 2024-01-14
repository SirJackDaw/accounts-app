import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JwtService} from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RpcAuthGuard implements CanActivate {
    constructor(private readonly  jwtService: JwtService, private readonly configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let token: string;

        if (context.getType() === 'rpc') {
            token = context.switchToRpc().getData().Authentication;
        }

        try {
            const payload = this.jwtService.verify(token, { secret: this.configService.get<string>('JWT_ACCESS_SECRET') });
            context.switchToRpc().getData().user = payload;
            return true;
        } catch (e) {
            return false;
        }
    }
}