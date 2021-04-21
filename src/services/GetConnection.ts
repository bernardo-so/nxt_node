import { Connection, createConnection, ObjectType } from 'typeorm';

class GetConnection<T> {

    private repository: ObjectType<T>;
    private connection: Connection;

    constructor(repository: ObjectType<T>) {
        this.repository = repository;
    }

    async open() {
        this.connection = await createConnection();
        return this.connection.getCustomRepository(this.repository);
    }

    async close() {
        if (this.connection.isConnected) {
            return this.connection.close();
        }
        return console.error("There are no connection open !");
    }
}

export { GetConnection };