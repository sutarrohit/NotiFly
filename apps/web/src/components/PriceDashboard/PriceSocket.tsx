"use client";
import Image from "next/image";
import { Button } from "@notifly/ui";
import { useRecoilState } from "recoil";
import { isAuthenticated } from "@notifly/recoil";
import { useEffect, useState } from "react";
import TokenPrice from "@/lib/websocket/TokenPrice";

const PriceSocket = () => {
  const [authenticated, setAuthenticated] = useRecoilState(isAuthenticated);
  console.log("authenticated", authenticated);

  const tokenArray = [
    // {
    //   symbol: "BTC",
    //   name: "Bitcoin",
    //   price: btcusdt?.data.p,
    //   icon: "/icons/btc.png",
    // },
    // {
    //   symbol: "ETH",
    //   name: "Ethereum",
    //   price: btcusdt?.data.p,
    //   icon: "/icons/eth.png",
    // },
    // {
    //   symbol: "SOl",
    //   name: "Solana",
    //   price: ethusdt?.data.p,
    //   icon: "/icons/sol.png",
    // },
    // {
    //   symbol: "AVAX",
    //   name: "AVAX",
    //   price: bnbusdt?.data.p,
    //   icon: "/icons/avax.png",
    // },
    // {
    //   symbol: "BTC",
    //   name: "Bitcoin",
    //   price: solusdt?.data.p,
    //   icon: "/icons/btc.png",
    // },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "1212434",
      icon: "/icons/eth.png",
    },
    {
      symbol: "SOl",
      name: "Solana",
      price: "1212434",
      icon: "/icons/sol.png",
    },
    {
      symbol: "AVAX",
      name: "AVAX",
      price: "1212434",
      icon: "/icons/avax.png",
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: "1212434",
      icon: "/icons/btc.png",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "1212434",
      icon: "/icons/eth.png",
    },
    {
      symbol: "SOl",
      name: "Solana",
      price: "1212434",
      icon: "/icons/sol.png",
    },
    {
      symbol: "AVAX",
      name: "AVAX",
      price: "1212434",
      icon: "/icons/avax.png",
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: "1212434",
      icon: "/icons/btc.png",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "1212434",
      icon: "/icons/eth.png",
    },
    {
      symbol: "SOl",
      name: "Solana",
      price: "1212434",
      icon: "/icons/sol.png",
    },
    {
      symbol: "AVAX",
      name: "AVAX",
      price: "1212434",
      icon: "/icons/avax.png",
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: "1212434",
      icon: "/icons/btc.png",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "1212434",
      icon: "/icons/eth.png",
    },
    {
      symbol: "SOl",
      name: "Solana",
      price: "1212434",
      icon: "/icons/sol.png",
    },
    {
      symbol: "AVAX",
      name: "AVAX",
      price: "1212434",
      icon: "/icons/avax.png",
    },
  ];

  return (
    <div className="min-h-screen w-[90%]">
      {/* Title */}

      {/* card */}
      <div>
        <div className="border-[0.02rem] bg-c_grey py-2 px-3 grid grid-cols-3 mt-10 text-sm font-extrabold text-c_White">
          <div>Name</div>
          <div>Price</div>
          <div>Notification</div>
        </div>
        {tokenArray.map((element, key) => {
          return (
            <div key={key} className="border-b-[0.06rem] border-c_grey py-4 md:p-4 grid grid-cols-3">
              <div className="flex items-center gap-2 md:gap-5">
                <Image src={element.icon} alt="" width="35" height="35" />
                <div className="flex">
                  <span className="text-sm font-bold">{element.symbol}</span>
                  <span className="hidden md:block ml-3 text-sm text-c_Litegrey">{element.name}</span>
                </div>
              </div>

              <span className="flex items-center text-sm font-semibold">{element.price}</span>

              <div>
                <Button
                  variant={"secondary"}
                  size={"small"}
                  className="w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] md:py-2 text-sm font-extrabold"
                >
                  Create
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <TokenPrice />
    </div>
  );
};

export default PriceSocket;
