import { Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";
import { GetConnection } from "./GetConnection";

export default class UserService {
    private getConnection = new GetConnection(UsersRepository);
    private usersRepository: Repository<User>;

    async create(email: string) {
        this.usersRepository = await this.getConnection.open();

        const userExists = await this.usersRepository.findOne({
            email
        })

        if (userExists) {
            this.getConnection.close();
            return userExists;
        }

        const user = this.usersRepository.create({
            email,
        });

        await this.usersRepository.save(user);
        this.getConnection.close();

        return user;
    }
}