import { Repository } from "typeorm";
import Settings from "../entities/Settings";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { GetConnection } from "./GetConnection";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private serviceConnection = new GetConnection(SettingsRepository);
    private settingsRepository: Repository<Settings>;

    async create({ chat, username }: ISettingsCreate) {
        this.settingsRepository = await this.serviceConnection.open();

        const userAlreadyExist = await this.settingsRepository.findOne({
            username,
        });

        if (userAlreadyExist) {
            throw new Error("User already exists!");
        }

        const settings = this.settingsRepository.create({ chat, username });
        await this.settingsRepository.save(settings);
        return settings;
    }

    async findByUsername(username: string) {
        this.settingsRepository = await this.serviceConnection.open();
        const settings = await this.settingsRepository.findOne({
            username,
        })
        return settings;
    }

    async update(username: string, chat: boolean) {
        this.settingsRepository = await this.serviceConnection.open();
        const settings = await this.settingsRepository
            .createQueryBuilder()
            .update(Settings)
            .set({ chat })
            .where("username = :username", {
                username
            })
            .execute();

        return settings;
    }
}

export { SettingsService }