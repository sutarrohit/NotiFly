import { startServer } from "../server";
import WebSocket from "ws";
import { tokenSet1 } from "../utils/tokenSets";
import { pushDataToClients } from "./serverController";

export let dataArray: any = {};

export const getTokensPrice = () => {
  const binanceSocket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${tokenSet1}`);

  binanceSocket.on("open", () => {
    console.log("connected");
  });
  binanceSocket.on("close", (code, reason) => {
    console.log(`WebSocket connection closed. Code: ${code}, Reason: ${reason}`);
    startServer();
  });
  binanceSocket.on("error", (error) => {
    console.error(`WebSocket error: ${error.message}`);
    startServer();
  });

  binanceSocket.onmessage = (event: any) => {
    const newData = JSON.parse(event.data);
    dataArray[newData.data.s] = newData.data.p;
  };

  setInterval(() => {
    pushDataToClients(dataArray);
  }, 1000);
};
