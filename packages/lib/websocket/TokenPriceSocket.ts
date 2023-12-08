export const TokenPriceSocket = () => {
  const tokenSet1 = "ethusdt@trade/btcusdt@trade/bnbusdt@trade/solusdt@trade";
  const socket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${tokenSet1}`);

  let mydata: any = [];

  socket.onmessage = (event) => {
    mydata.push(JSON.parse(event.data));
  };

  socket.close();
};
