import { dataArray, fetchTokenPrice } from "./priceEngine";

const data = [
  { BTCUSDT: ["42401.06000000", "2000"] },
  { ETHUSDT: ["2246.91000000"] },
  { DOGEUSDT: ["0.09903000", "04535434"] },
];

function isCryptoObjectWithArray(obj: any): obj is { [key: string]: string[] } {
  return typeof obj === "object" && Array.isArray(obj[Object.keys(obj)[0]]);
}

async function checkPrice() {
  data.forEach((element) => {
    if (isCryptoObjectWithArray(element)) {
      for (const tokenName in element) {
        if (element.hasOwnProperty(tokenName)) {
          const prices = element[tokenName];

          prices.forEach((price) => {
            if (dataArray.hasOwnProperty(tokenName)) {
              //   console.log("tokenName+++++++++", tokenName);
              //   console.log("price============", price);
              //   console.log("dataArray[tokenName][[[[[[[[[[", dataArray[tokenName]);

              if (price === dataArray[tokenName]) triggredNotification(tokenName, price);
            }
          });
        }
      }
    } else {
      console.error("Unsupported crypto object:", element);
    }
  });
  return true;
}

async function myloop() {
  let counter = 1;
  let response: Boolean = await checkPrice();

  console.log("react", dataArray);
  if (response) {
    setInterval(() => {
      checkPrice();
      dataArray;
      console.log("counter", counter);
      counter = counter + 1;
      response = false;
    }, 5000);
  }
}

function triggredNotification(tokenName: string, price: string) {
  console.log("triggred notification for price", tokenName, price);
}

fetchTokenPrice();
myloop();
