import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose'
import { Model, Connection, FilterQuery } from 'mongoose';
import { AbstractRepository } from 'libs/common';
import { User } from './user.schema';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
    protected readonly logger = new Logger(UserRepository.name)

    constructor(@InjectModel(User.name) userModel: Model<User>, @InjectConnection() connection: Connection) {
        super(userModel, connection)
    }

    async findOne(filterQuery: FilterQuery<User>): Promise<User> {
        return this.model.findOne(filterQuery)
    }
}