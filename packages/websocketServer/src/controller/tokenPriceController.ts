const tokenSet1 = "ethusdt@trade/btcusdt@trade/bnbusdt@trade/solusdt@trade";
const binanceSocket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${tokenSet1}`);

let dataArray: any[] = [];

binanceSocket.onmessage = (event) => {
  const newData = JSON.parse(event.data.toString());

  // Check if an entry with the same identifier exists in the array
  const existingIndex = dataArray.findIndex((entry) => entry.id === newData.id);

  if (existingIndex !== -1) {
    // Modify the existing entry
    dataArray[existingIndex] = newData;
  } else {
    // Add the new entry to the array
    dataArray.push(newData);
  }

  console.log(dataArray);
};
