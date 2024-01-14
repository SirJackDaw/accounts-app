import { AbstractEntity } from "libs/common";
import { Column, Entity } from "typeorm";

@Entity()
export class User extends AbstractEntity<User> {
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;
}