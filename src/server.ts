import express from "express";

const app = express();

app.listen(3333, () => console.log("Server is running on port 3333!"))

app.get("/",(request, response) => {
    return response.json({
        message: "Hello User!"
    });
});

app.post("/users",(request, response) => {
    return response.json({
        message: "User saved !"
    });
});
