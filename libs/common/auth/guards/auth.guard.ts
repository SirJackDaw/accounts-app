import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap } from 'rxjs';
  
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTH') private authClient: ClientProxy) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    let token: string;
    if (context.getType() === 'http') token = context.switchToHttp().getRequest().get('authorization')
    // if (context.getType() === 'ws') token = context.switchToWs().getClient().handshake.auth.token
    if (!token) throw new UnauthorizedException();
    return this.authClient.send('validate_user', { Authentication: token.split(' ')[1] })
      .pipe(
        tap((res) => this.addUser(res, context)),
        catchError(() => { throw new UnauthorizedException() }),
      );
  }
  
  private addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
}