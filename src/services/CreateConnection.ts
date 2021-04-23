import { Connection, createConnection } from "typeorm";

class CreateConnection {
    async createMainConnection() {
        const connection: Connection = await createConnection();
        connection.connect();
    }
}

export { CreateConnection };