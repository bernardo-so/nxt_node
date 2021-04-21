import { createConnection } from "typeorm";
import { Connection } from "typeorm/connection/Connection";
import { SettingRepository } from "../repositories/SettingRepository";

interface ISettingCreate {
    chat: boolean;
    user_name: string;
}

class SettingService {

    async create({ chat, user_name }: ISettingCreate) {
        const connection: Connection = await createConnection();
        const settingsRepository = connection.getCustomRepository(SettingRepository);

        const settings = settingsRepository.create({
            chat,
            user_name
        });
        await settingsRepository.save(settings);
        connection.close();
        return settings;
    }
}

export { SettingService }