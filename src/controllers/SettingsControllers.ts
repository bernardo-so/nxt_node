import { Request, Response } from "express"
import { SettingService } from "../services/SettingService";

class SettingsControllers {
    async create(request: Request, response: Response) {
        const { chat, user_name } = request.body;
        
        const settingService = new SettingService();
        const settings = await settingService.create(chat, user_name);
        return response.json(settings);
    }
}

export { SettingsControllers };