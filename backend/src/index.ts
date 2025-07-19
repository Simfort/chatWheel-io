import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { messageIO } from "./controllers/message.controller";
import { joinIO } from "./controllers/join.controller";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);
const server = createServer(app);
export const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
  messageIO(socket);
  joinIO(socket);
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log("Server on " + "http://localhost:" + PORT);
});
