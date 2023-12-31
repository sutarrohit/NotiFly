import { dataArray, fetchTokenPrice } from "./priceEngine";
import { fetchNotificationData, NotificationArray } from "./fetchNotifcations";
import { sendNotifcationToQueue } from "./sendNotification";

type TokenData = {
  [tokenSymbol: string]: string[];
};
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

          tokenData.targetPrice = tokenData.targetPrice.filter((price: any) => price > livePrice);
          triggredNotification(token, pricesAboveLivePrice);
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
          tokenData.targetPrice = tokenData.targetPrice.filter((price: any) => price < livePrice);
          triggredNotification(token, pricesBelowLivePrice);
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
