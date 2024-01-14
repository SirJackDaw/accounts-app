import { Injectable, UnprocessableEntityException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { User } from './user.entity';
import { EntityManager, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>, private readonly entityManager: EntityManager) {}

    async createUser(dto: CreateUserDto) {
        this.validateRequest(dto)
        const user = new User({
            ...dto,
            password: await bcrypt.hash(dto.password, 10),
        })

        this.entityManager.save(user)

        return user
    }

    async getUserById(id: string) {
        return this.usersRepository.findOne({ where: { id } })
    }

    async validateUser(dto: LoginDto) {
        const { email, password } = dto
        const user = await this.usersRepository.findOne({ where: { email } })
        if (!user) throw new BadRequestException('User not found')

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
          throw new UnauthorizedException('Credentials are not valid');
        }

        return user
    }

    private async validateRequest(dto: CreateUserDto) {
        const { email } = dto
        const userExists = await this.usersRepository.exist({ where: { email } })
        if (userExists) throw new BadRequestException('Email already exists')
    }
}
