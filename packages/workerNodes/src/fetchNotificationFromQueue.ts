import { createClient } from "redis";
import { sendNotifcationMail } from "./sendNotifcationMail";
import dotenv from "dotenv";
dotenv.config();

async function fetchNotificationFromRedisQueue() {
  try {
    const client = await createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || ""),
      },
    }).connect();

    const notifications = await client.lRange("NotificationQueue", 0, 2);
    const parsedNotifications = notifications.map((element) => JSON.parse(element));
    console.log("Notification array", notifications);
    if (parsedNotifications.length !== 0) {
      await sendNotifcationMail(parsedNotifications);
    }
    parsedNotifications.forEach(async () => {
      const deletedNotification = await client.lPop("NotificationQueue");
      console.log("deletedNotification", deletedNotification);
    });

    client.quit();
    return true;
  } catch (error) {
    console.log(error);
  }
}

setInterval(() => {
  fetchNotificationFromRedisQueue();
}, 5000);
