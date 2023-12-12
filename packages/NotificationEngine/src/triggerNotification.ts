import { dataArray, fetchTokenPrice } from "./priceEngine";
import { fetchNotificationData, NotificationArray } from "./fetchNotifcations";

type TokenData = {
  [tokenSymbol: string]: string[];
};

let data: TokenData[];

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

function isCryptoObjectWithArray(obj: any): obj is { [key: string]: string[] } {
  return typeof obj === "object" && Array.isArray(obj[Object.keys(obj)[0]]);
}

// async function checkPrice() {
//   if (!NotificationArray) {
//     console.error("NotificationArray is undefined.");
//     return false;
//   }

//   if (!dataArray) {
//     console.error("dataArray undefined.");
//     return false;
//   }

//   NotificationArray?.forEach((tokenData: any) => {
//     const { token, targetPrice, uptrend } = tokenData;

//     // console.log("token", token);
//     // console.log("targetPrice", targetPrice);
//     const livePrice = parseFloat(dataArray[token]);
//     // console.log("livePrice", livePrice);

//     if (uptrend) {
//       console.log("upstream=======");
//       const pricesAboveLivePrice = targetPrice.filter((price: any) => price > livePrice);
//       if (pricesAboveLivePrice !== 0) triggredNotification(token, pricesAboveLivePrice);
//     }
//     if (!uptrend) {
//       console.log("Down======");
//       const pricesBelowLivePrice = targetPrice.filter((price: any) => price < livePrice);
//       if (pricesBelowLivePrice.length !== 0) triggredNotification(token, pricesBelowLivePrice);
//     }
//   });
//   console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");
//   return true;
// }
function checkPrice() {
  if (!NotificationArray) {
    console.error("NotificationArray is undefined.");
    return false;
  }

  if (!dataArray) {
    console.error("dataArray undefined.");
    return false;
  }

  console.log("00000000000000000000", NotificationArray);

  NotificationArray?.forEach((tokenData: any) => {
    const { token, targetPrice, uptrend } = tokenData;

    // console.log("token", token);
    // console.log("targetPrice", targetPrice);
    const livePrice = parseFloat(dataArray[token]);
    // console.log("livePrice", livePrice);

    if (uptrend) {
      console.log("upstream=======");
      const pricesAboveLivePrice = targetPrice.filter((price: any) => price >= livePrice);
      if (pricesAboveLivePrice.length !== 0) {
        triggredNotification(token, pricesAboveLivePrice);
        tokenData.targetPrice = tokenData.targetPrice.filter((price: any) => price <= livePrice);
      }
    } else {
      console.log("Down======");
      const pricesBelowLivePrice = targetPrice.filter((price: any) => price <= livePrice);
      if (pricesBelowLivePrice.length !== 0) {
        triggredNotification(token, pricesBelowLivePrice);
        tokenData.targetPrice = tokenData.targetPrice.filter((price: any) => price >= livePrice);
      }
    }
  });

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");
  return true;
}

async function triggredNotification(tokenName: string, price: number) {
  console.log("triggred notification for price", tokenName, price);
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
