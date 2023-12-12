import WebSocket from "ws";

export let dataArray: any;

// export let dataArray: any = {
//   BNBUSDT: "255.00000000",
//   SNXUSDT: "4.62200000",
//   MKRUSDT: "1353.00000000",
//   FTTUSDT: "4.99460000",
//   LINKUSDT: "15.10900000",
//   ARBUSDT: "1.09800000",
//   IMXUSDT: "1.92890000",
//   ETHUSDT: "2239.84",
//   INJUSDT: "22.44200000",
//   DOGEUSDT: "0.09903000",
//   AVAXUSDT: "36.44000000",
//   OPUSDT: "2.29100000",
//   TRXUSDT: "0.10548000",
//   ADAUSDT: "0.55590000",
//   BTCUSDT: "42401.06000000",
//   SANDUSDT: "0.51480000",
//   MATICUSDT: "0.85500000",
//   TIAUSDT: "10.24140000",
//   STXUSDT: "0.91540000",
//   ETCUSDT: "20.18000000",
//   AXSUSDT: "7.27000000",
//   LTCUSDT: "73.35000000",
//   BCHUSDT: "234.60000000",
//   ORDIUSDT: "48.11000000",
//   ATOMUSDT: "9.97100000",
//   UNIUSDT: "6.27500000",
//   XRPUSDT: "0.62510000",
//   FILUSDT: "4.72400000",
//   MANAUSDT: "0.49460000",
//   FTMUSDT: "0.37150000",
//   APTUSDT: "7.86680000",
//   XLMUSDT: "0.12610000",
//   SOLUSDT: "69.56000000",
//   RUNEUSDT: "5.95500000",
//   DOTUSDT: "6.71200000",
//   FLOWUSDT: "0.77800000",
//   RNDRUSDT: "3.68200000",
//   NEARUSDT: "2.33800000",
//   ICPUSDT: "5.35000000",
//   GRTUSDT: "0.16220000",
//   AAVEUSDT: "91.38000000",
//   HBARUSDT: "0.07220000",
//   ALGOUSDT: "0.18900000",
//   LUNAUSDT: "1.01850000",
//   SHIBUSDT: "0.00000973",
//   XMRUSDT: "171.00000000",
//   THETAUSDT: "1.05200000",
//   LDOUSDT: "2.28800000",
//   WBETHUSDT: "2239.84",
//   WBTCUSDT: "42272.10000000",
// };

// Get lated token price
export const fetchTokenPrice = () => {
  const liveTokenPrice = new WebSocket("ws://localhost:1337");

  liveTokenPrice.on("open", () => {
    console.log("Connected to webscoket server");
  });

  liveTokenPrice.on("close", (code, reason) => {
    console.log(`WebSocket connection closed. Code: ${code}, Reason: ${reason}`);
  });

  liveTokenPrice.on("error", (error) => {
    console.error(`WebSocket error: ${error.message}`);
  });

  liveTokenPrice.onmessage = (event: any) => {
    dataArray = JSON.parse(event.data);
  };
};
