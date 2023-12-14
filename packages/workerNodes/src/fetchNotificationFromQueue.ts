import { createClient } from "redis";
import { sendNotifcationMail } from "./sendNotifcationMail";

async function fetchNotificationFromRedisQueue() {
  try {
    const client = await createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();

    const notifications = await client.lRange("NotificationQueue", 0, 2);
    const parsedNotifications = notifications.map((element) => JSON.parse(element));
    console.log("notifications..s", notifications);
    if (parsedNotifications.length !== 0) {
      await sendNotifcationMail(parsedNotifications);
    }
    parsedNotifications.forEach(async () => {
      const a = await client.lPop("NotificationQueue");
      console.log("----------a", a);
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
