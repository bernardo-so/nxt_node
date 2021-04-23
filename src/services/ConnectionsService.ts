import { ConnectionRepository } from "../repositories/ConnectionRepository";
import { GetConnection } from "./GetConnection";
import { Connections } from "../entities/Connections";
import { Repository } from "typeorm";

interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionsService {
    private serviceConnection = new GetConnection(ConnectionRepository);
    private connectionRepository: Repository<Connections>;

    async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
        this.connectionRepository = await this.serviceConnection.open();
        const connection = this.connectionRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        })
        await this.connectionRepository.save(connection);

        return connection;
    };

    async findByUserId(user_id) {
        this.connectionRepository = await this.serviceConnection.open();
        const connection = await this.connectionRepository.findOne({
            user_id
        })

        return connection;

    }
}

export { ConnectionsService };