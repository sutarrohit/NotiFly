import { dataArray, fetchTokenPrice } from "./priceEngine";
import { fetchNotificationData, NotificationArray } from "./fetchNotifcations";
import { sendNotifcationToQueue } from "./sendNotification";

type TokenData = {
  [tokenSymbol: string]: string[];
};

const myTokenData = [
  {
    token: "BNBUSDT",
    targetPrice: [255, 280.9, 220.9, 253.3],
    uptrend: true,
  },
  {
    token: "SOLUSDT",
    targetPrice: [79.74, 69.74, 220.9, 291.9],
    uptrend: true,
  },
  {
    token: "ETHUSDT",
    targetPrice: [2239.84, 22279.11],
    uptrend: true,
  },
];

function checkPrice() {
  try {
    if (!NotificationArray) {
      console.error("NotificationArray is undefined.");
      return false;
    }

    if (!dataArray) {
      console.error("dataArray undefined.");
      return false;
    }
    NotificationArray?.forEach((tokenData: any) => {
      const { token, targetPrice, uptrend } = tokenData;

      // console.log("token", token);
      // console.log("targetPrice", targetPrice);
      const livePrice = parseFloat(dataArray[token]);
      // console.log("livePrice", livePrice);

      if (uptrend) {
        console.log("uptrend==========================================");
        console.log(token, targetPrice);
        console.log("livePrice", livePrice);
        // console.log("uptrendToken", token);
        // console.log("uptrendPrice", targetPrice);
        // console.log("uptrendLivePrice", livePrice);
        const pricesAboveLivePrice = targetPrice.filter((price: any) => price <= livePrice);

        if (pricesAboveLivePrice.length !== 0) {
          console.log("trigged sendNotificationFunction...");
          triggredNotification(token, pricesAboveLivePrice);
          tokenData.targetPrice = tokenData.targetPrice.filter((price: any) => price > livePrice);
        }
      }
      if (!uptrend) {
        console.log("DownTrend================================================");
        console.log(token, targetPrice);
        console.log("livePrice", livePrice);
        // console.log("DownToken", token);
        // console.log("DownPrice", targetPrice);
        // console.log("DownPrice", livePrice);
        const pricesBelowLivePrice = targetPrice.filter((price: any) => price >= livePrice);
        if (pricesBelowLivePrice.length !== 0) {
          console.log("trigged sendNotificationFunction...");
          triggredNotification(token, pricesBelowLivePrice);
          tokenData.targetPrice = tokenData.targetPrice.filter((price: any) => price < livePrice);
        }
      }
    });

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function triggredNotification(tokenName: string, prices: number[]) {
  console.log("tokenName................", tokenName);
  console.log("prices......------------.", prices);
  sendNotifcationToQueue(tokenName, prices);
}

async function myloop() {
  let counter = 1;
  setInterval(() => {
    dataArray;
    checkPrice();
    console.log("counter", counter);
    counter = counter + 1;
  }, 9000);
}

fetchTokenPrice();
fetchNotificationData();
myloop();
