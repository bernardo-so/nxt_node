import express from "express";
import "reflect-metadata";
import "./database"
import { routes } from "./routes";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html")
});

const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket: Socket) => {
    console.log("WS Connected", socket.id);
});

app.use(express.json());

app.use(routes);

export { http, io };