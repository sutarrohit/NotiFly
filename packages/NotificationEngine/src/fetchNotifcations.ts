import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const graphqlEndpoint = process.env.SERVER_DOMAIN as string;
const graphqlQuery = `
query {
  getAllNotifications {
    token
    targetPrice
    uptrend
}
}`;

export let NotificationArray: any;

const cookies = `AuthToken=${process.env.SERVER_COOKIES}`;

export async function getNotificationData() {
  console.log("Fetching Notification Data.......");
  axios
    .post(
      graphqlEndpoint,
      {
        query: graphqlQuery,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
      },
    )
    .then((response) => {
      const notifications = response.data.data.getAllNotifications;
      NotificationArray = notifications;

      return notifications;
    })
    .catch((error) => {
      console.error("Error making GraphQL query:", error.message);
    });
}

let flag = true;
export function fetchNotificationData() {
  if (true) getNotificationData();
  flag = false;

  setInterval(() => {
    getNotificationData();
  }, 30000);
}
