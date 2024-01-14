import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule, RmqModule } from 'libs/common';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt'
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/auth/.env' }),
    CacheModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: +configService.get('REDIS_PORT'),
      }),
      inject: [ConfigService]
    }),
    DatabaseModule,
    UsersModule,
    RmqModule,
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy],
})
export class AuthModule {}
