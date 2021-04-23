import { Repository, SimpleConsoleLogger } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";
import { GetConnection } from "./GetConnection";

class UsersService {
    private serviceConnection = new GetConnection(UsersRepository);
    private usersRepository: Repository<User>;

    async create(email: string) {
        this.usersRepository = await this.serviceConnection.open();

        const userExist = await this.usersRepository.findOne({
            email
        })

        if (userExist) {
            return userExist;
        }

        const user = this.usersRepository.create({
            email,
        });

        await this.usersRepository.save(user);

        return user;
    }

    async findByEmail(email: string) {
        this.usersRepository = await this.serviceConnection.open();
        const userExists = await this.usersRepository.findOne({
            email
        })
        if (userExists) {
            return userExists;
        }
        return null;
    }
}

export { UsersService };