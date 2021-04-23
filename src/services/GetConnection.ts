import { getConnection, ObjectType } from 'typeorm';

class GetConnection<T> {

    private repository: ObjectType<T>;

    constructor(repository: ObjectType<T>) {
        this.repository = repository;
    }

    async open() {
        const connection = getConnection();
        return connection.getCustomRepository(this.repository);
    }
}

export { GetConnection };