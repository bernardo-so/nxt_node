import { Request, Response } from "express"
import { SettingsService } from "../services/SettingsService";

class SettingsControllers {
    async create(request: Request, response: Response) {
        const { chat, username } = request.body;

        const settingService = new SettingsService();

        try {
            const settings = await settingService.create({ chat, username });
            return response.json(settings);
        } catch (err) {
            return response.status(400).json({ message: err.message });
        }
    }
}

export { SettingsControllers };