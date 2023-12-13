import axios from "axios";
const graphqlEndpoint = "http://localhost:8000/graphql";
const graphqlQuery = `
query {
  getAllNotifications {
    token
    targetPrice
    uptrend
}
}`;

export let NotificationArray: any;

export async function getNotificationData() {
  console.log("Fetching Notification Data.......");

  axios
    .post(graphqlEndpoint, {
      query: graphqlQuery,
    })
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
