import { http } from "./http"
import { CreateConnection } from "./services/CreateConnection";
import "./websocket/client"

const createConnection: CreateConnection =  new CreateConnection();
createConnection.createMainConnection();

http.listen(3333, () => console.log("Server is running on port 3333!"))
