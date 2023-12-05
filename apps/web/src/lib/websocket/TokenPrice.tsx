import React, { useEffect, useState } from "react";
import { TokenPriceSocket } from "@notifly/lib";
import { Socket } from "dgram";
import { ITokenPrice } from "@notifly/lib";

const tokenSet1 = "ethusdt@trade/btcusdt@trade/bnbusdt@trade/solusdt@trade";

const TokenPrice = () => {
  const [tokenPrices, setTokenPrices] = useState<ITokenPrice[]>([
    {
      stream: "btcusdt@trade",
      data: {
        e: "trade",
        E: 1701757186524,
        s: "BTCUSDT",
        t: 3306798564,
        p: "41877.94000000",
        q: "0.01735000",
        b: 23569157884,
        a: 23569157958,
        T: 1701757186524,
        m: true,
        M: true,
      },
    },
  ]);

  // useEffect(() => {
  //   // Use the TokenPriceSocket function to handle the WebSocket logic

  //   const socket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${tokenSet1}`);
  //   socket.onmessage = (event) => {
  //     const newData = JSON.parse(event.data);
  //     updateTokenPrices(newData);
  //   };

  //   socket.close();
  // }, []);

  const updateTokenPrices = (newData: ITokenPrice) => {
    const existingIndex = tokenPrices.findIndex((price) => price.stream === newData.stream);
    if (existingIndex !== -1) {
      // If the symbol is found, replace the existing object with the new data
      setTokenPrices((prevPrices) => {
        const updatedPrices = [...prevPrices];
        updatedPrices[existingIndex] = newData;
        return updatedPrices;
      });
    } else {
      // setTokenPrices((prevPrices) => [...prevPrices, newData]);
    }
  };

  console.log("tokenPrice", tokenPrices);

  return (
    <div>
      {tokenPrices.map((element, key) => {
        return <div key={key}>{element.data.p}</div>;
      })}
    </div>
  );
};

export default TokenPrice;
