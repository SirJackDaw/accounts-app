import { Controller, Post,Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { MessagePattern } from '@nestjs/microservices';
import { RpcAuthGuard } from './guards/rpc.guard';
import { CurrentUser } from 'libs/common';
import { User } from './users/user.schema';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';

// @ApiBearerAuth()
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto})
  createUser(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto)
  }

  @Post('login')
  @ApiBody({ type: LoginDto})
  @ApiResponse({status: 200, description: 'Login success', type: ()=> ({ accessToken: String, refreshToken: String })})
  async login(@Body() dto: LoginDto){
    return this.authService.login(dto)
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @ApiResponse({ status: 200, description: 'logout success' })
  @ApiUnauthorizedResponse()
  async logout(@CurrentUser() user: User) {
    return this.authService.logout(user._id.toHexString())
  }

  @Post('refresh')
  @ApiBody({ type: ()=> ({ token: String })})
  @ApiResponse({ status: 200, description: 'Refresh success', type: ()=> ({ accessToken: String, refreshToken: String }) })
  async refresh(@Body() token: { token: string }) {
    return this.authService.refreshToken(token.token)
  }

  @UseGuards(RpcAuthGuard)
  @MessagePattern('validate_user')
  validateUser(@CurrentUser() user: User): User {
    return user;
  }
}
