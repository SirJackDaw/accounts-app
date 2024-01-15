import { Controller, Post,Get, Body, UseGuards, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { MessagePattern } from '@nestjs/microservices';
import { RpcAuthGuard } from './guards/rpc.guard';
import { CurrentUser } from 'libs/common';
import { User } from './users/user.schema';

@UseInterceptors(ClassSerializerInterceptor)
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
    return this.authService.logout(user._id.toHexString())
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
