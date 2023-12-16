import WebSocket from "ws";
import dotenv from "dotenv";
dotenv.config();

export let dataArray: any;

// Get lated token price
export const fetchTokenPrice = () => {
  const liveTokenPrice = new WebSocket(process.env.WEBSOCKET_SERVER || "");

  liveTokenPrice.on("open", () => {
    console.log("Connected to webscoket server");
  });

  liveTokenPrice.on("close", (code, reason) => {
    console.log(`WebSocket connection closed. Code: ${code}, Reason: ${reason}`);
  });

  liveTokenPrice.on("error", (error) => {
    console.error(`WebSocket error: ${error.message}`);
  });

  liveTokenPrice.onmessage = (event: any) => {
    dataArray = JSON.parse(event.data);
  };
};
