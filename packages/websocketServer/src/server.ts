import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import cors from "cors";
import { onSocketPreError, onSocketPostError } from "./controller/serverController";

const PORT = 1337;
const app = express();
app.use(cors());

const server = app.listen(PORT, () => {
  console.log("WebSocket Running on port", PORT);
});

const clients = new Set<WebSocket>();
export const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req, socket, head) => {
  socket.on("error", onSocketPreError);
  // perform auth..
  wss.handleUpgrade(req, socket, head, (ws) => {
    socket.removeListener("error", onSocketPreError);
    wss.emit("connection", ws, req);
  });
});

wss.on("connection", (ws, req) => {
  ws.on("error", onSocketPostError);
  clients.add(ws);
  console.log("websocket is connected");
  ws.on("message", (message, isBinary) => {
    console.log(`Received message: ${message}`);
  });
  ws.on("close", () => {
    clients.delete(ws);
    console.log("Connection is closed");
  });

  const initialData = { message: "Initial Server Push", timestamp: new Date().toISOString() };
  ws.send(JSON.stringify(initialData)); // Push data immediately upon connection
});
