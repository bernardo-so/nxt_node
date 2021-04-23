import { Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { GetConnection } from "./GetConnection";

interface IMessageCreate {
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessagesService {
    private serviceConnection = new GetConnection(MessagesRepository);
    private messagesRepository: Repository<Message>;

    async create({ admin_id, text, user_id }: IMessageCreate) {
        this.messagesRepository = await this.serviceConnection.open();

        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        });

        await this.messagesRepository.save(message);
        return message;
    }

    async listByUser(user_id: string) {
        this.messagesRepository = await this.serviceConnection.open();

        const list = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"]
        });

        return list;
    }
}

export { MessagesService };