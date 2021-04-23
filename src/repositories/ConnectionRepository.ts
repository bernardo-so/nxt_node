import { EntityRepository } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { Connections } from "../entities/Connections"

@EntityRepository(Connections)
class ConnectionRepository extends Repository<Connections> {}

export { ConnectionRepository };