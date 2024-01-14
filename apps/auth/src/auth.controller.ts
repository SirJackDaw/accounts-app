import { Controller, Post,Get, Body, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { User } from './users/user.entity';
import { MessagePattern } from '@nestjs/microservices';
import { RpcAuthGuard } from './guards/rpc.guard';
import { CurrentUser } from 'libs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto){
    return this.authService.login(dto)
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@CurrentUser() user: User) {
    return this.authService.logout(user.id)
  }

  @Post('refresh')
  async refresh(@Body() token: { token: string }) {
    return this.authService.refreshToken(token.token)
  }

  @UseGuards(RpcAuthGuard)
  @MessagePattern('validate_user')
  validateUser(@CurrentUser() user: User): User {
    return user;
  }
}
