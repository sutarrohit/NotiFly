import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import cors from "cors";
import { onSocketPreError, onSocketPostError } from "./controller/serverController";
import { gettokensPrice } from "./controller/tokenPriceController";

const PORT = 1337;
const app = express();
app.use(cors());
let wss: WebSocketServer;

export function startServer() {
  const server = app.listen(PORT, () => {
    console.log("WebSocket Running on port", PORT);
    gettokensPrice();
  });

  wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (req, socket, head) => {
    socket.on("error", onSocketPreError);
    // perform auth..
    wss.handleUpgrade(req, socket, head, (ws) => {
      socket.removeListener("error", onSocketPreError);
      wss.emit("connection", ws, req);
    });
  });

  wss.on("connection", (ws, req) => {
    console.log("websocket is connected");

    ws.on("error", onSocketPostError);

    ws.on("message", (message, isBinary) => {
      console.log(`Received message: ${message}`);
    });

    ws.on("close", () => {
      console.log("Connection is closed");
    });
  });
}

export { wss };
startServer();
