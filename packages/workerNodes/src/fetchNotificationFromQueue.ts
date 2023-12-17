import { createClient } from "redis";
import { sendNotifcationMail } from "./sendNotifcationMail";
import dotenv from "dotenv";
dotenv.config();

let client: any;
async function connectTORedisServer() {
  client = await createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || ""),
    },
  }).connect();

  if (client) console.log("Connected to the redis server");
}

async function fetchNotificationFromRedisQueue() {
  try {
    const notifications = await client.lRange("NotificationQueue", 0, 2);
    const parsedNotifications = notifications.map((element: any) => JSON.parse(element));
    console.log("Notification array", notifications);
    if (parsedNotifications.length !== 0) {
      await sendNotifcationMail(parsedNotifications);
    }
    parsedNotifications.forEach(async () => {
      const deletedNotification = await client.lPop("NotificationQueue");
      console.log("Notification Deleted from Queue :", deletedNotification);
    });

    // client.quit();
    return true;
  } catch (error) {
    console.log(error);
  }
}

connectTORedisServer();
setInterval(() => {
  fetchNotificationFromRedisQueue();
}, 10000);
