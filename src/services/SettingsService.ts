import { Repository } from "typeorm";
import Settings from "../entities/Settings";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { GetConnection } from "./GetConnection";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private getConnection = new GetConnection(SettingsRepository);
    private settingsRepository: Repository<Settings>;

    async create({ chat, username }: ISettingsCreate) {
        this.settingsRepository = await this.getConnection.open();

        const userAlreadyExist = await this.settingsRepository.findOne({
            username,
        });

        if (userAlreadyExist) {
            throw new Error("User already exists!");
        }

        const settings = this.settingsRepository.create({ chat, username });
        await this.settingsRepository.save(settings);
        this.getConnection.close();
        return settings;
    }
}

export { SettingsService }