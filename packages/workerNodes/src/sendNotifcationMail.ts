import { NotificationMail } from "./NotificationMail/NotificationMail";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const graphqlEndpoint = process.env.SERVER_DOMAIN as string;
const mutation = `
mutation Mutation($deliveredNotifications: [String]) {
  updateNotificationDeliveredTime(deliveredNotifications: $deliveredNotifications)
}
`;

export async function sendNotifcationMail(notifications: any) {
  try {
    notifications.forEach(async (element: any) => {
      const { targetPrice, token, receiverEmail, notificationType, id } = element;

      const response = await NotificationMail.sendEmail(targetPrice, token, receiverEmail, notificationType);
    });

    const notificationsID = notifications.map((notification: any) => notification.id);
    updateNotificationDeliveredTime(notificationsID);
  } catch (error) {
    console.log(error);
  }
}

async function updateNotificationDeliveredTime(notificationsID: string[]) {
  try {
    const cookies = `AuthToken=${process.env.SERVER_COOKIES}`;
    const variables = {
      deliveredNotifications: notificationsID,
    };
    axios
      .post(
        graphqlEndpoint,
        {
          query: mutation,
          variables: variables,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: cookies,
          },
        },
      )
      .then((response) => {
        console.log("response", response.data);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  } catch (error) {
    console.log(error);
  }
}
