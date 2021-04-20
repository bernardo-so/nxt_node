import { createConnection } from "typeorm";
import { Connection } from "typeorm/connection/Connection";
import { SettingRepository } from "../repositories/SettingRepository";
import { Request, Response } from "express"

class SettingsControllers {
    async create(request: Request, response: Response) {
        const { chat, user_name } = request.body;
        const connection: Connection = await createConnection();
        const settingsRepository = connection.getCustomRepository(SettingRepository);

        const settings = settingsRepository.create({
            chat,
            user_name
        });

        await settingsRepository.save(settings);

        return response.json(settings);
    }
}

export { SettingsControllers };