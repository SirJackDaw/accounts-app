import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager';
import { CreateAccountDto, JwtPayload } from 'libs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { ClientProxy } from '@nestjs/microservices';
import { tap, timeout } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    @Inject('BILLING') private readonly billingClient: ClientProxy,
    private readonly jwtService: JwtService, 
    private readonly configService: ConfigService, 
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async register(dto: CreateUserDto) {
    return this.userService.createUser(dto).then(user => { 
      this.billingClient.emit('create_account', new CreateAccountDto(user._id.toHexString(), 'RUB'))
      .pipe(
        timeout(5000),
        tap(res => console.log(res))
      );
      return user
    })
  }

  async login(dto: LoginDto): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.userService.validateUser(dto)
    const tokens = this.getTokens({ id: user._id.toString(), username: user.name, email: user.email })
    return tokens
  }

  async refreshToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, { secret: this.configService.get<string>('JWT_REFRESH_SECRET') });
    const { id, username, email } = payload

    const oldRefreshToken = await this.cacheManager.get<string>(payload.id)
    if (!oldRefreshToken || refreshToken !== oldRefreshToken) throw new UnauthorizedException('token error')

    const tokens = this.getTokens({ id, username, email })
    return tokens;
  }

  async logout(userId: string) {
    this.cacheManager.del(userId)
  }

  private async getTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        payload,
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: +this.configService.get<string>('ACCESS_EXPIRY_IN_SECONDS'),
        },
      ),
      this.jwtService.signAsync(
        payload,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: +this.configService.get<string>('REFRESH_EXPIRY_IN_SECONDS'),
        },
      ),
    ]);

    this.cacheManager.set(payload.id, refreshToken, +this.configService.get<string>('REFRESH_EXPIRY_IN_SECONDS')*1000)

    return {
      accessToken,
      refreshToken,
    };
  }
}
