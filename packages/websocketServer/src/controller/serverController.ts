import { wss } from "../server";
import { WebSocket } from "ws";

export const onSocketPreError = (error: Error) => {
  console.log("Pre Error", error);
};
export const onSocketPostError = (error: Error) => {
  console.log("Post Error", error);
};

// Function to push data to all connected clients
export function pushDataToClients(data: any) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}
