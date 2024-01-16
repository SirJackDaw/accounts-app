import { Injectable, BadRequestException, UnauthorizedException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/createUser.dto';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from './user.repository';
import { User } from './user.schema';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAccountDto } from 'libs/common';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository, @Inject('BILLING') private readonly billingClient: ClientProxy) {}

    async createUser(dto: CreateUserDto) {
        this.validateRequest(dto)
        return this.userRepository.create({...dto, password: await bcrypt.hash(dto.password, 10)}).then(user => {
            this.billingClient
            .emit('create_account', new CreateAccountDto(user._id.toHexString(), 'RUB'))
            .subscribe()
        })
    }

    async getUserById(id: string) {
        return this.userRepository.findOne({ where: { id } })
    }

    async validateUser(dto: LoginDto): Promise<User> {
        const { email, password } = dto
        const user = await this.userRepository.findOne({ email })
        if (!user) throw new BadRequestException('User not found')

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
          throw new UnauthorizedException('Credentials are not valid');
        }

        return user
    }

    private async validateRequest(dto: CreateUserDto) {
        const { email } = dto
        const user = await this.userRepository.findOne({ email })
        if (user) return new BadRequestException('Email already exists')
    }
}
