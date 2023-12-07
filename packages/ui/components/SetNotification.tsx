"use client";
import { useState } from "react";
import { tokenData } from "@notifly/lib";
import Image from "next/image";
import Button from "./Button";

const SetNotification = ({ token }: { token: string }) => {
  const tokenObj = tokenData.filter((element) => element.symbol === token);
  const [tokenPrice, setTokenPrice] = useState("");

  console.log("tokenPrice", tokenPrice);

  const handleSubmit = () => {};

  return (
    <div className=" text-c_White flex flex-col p-10 justify-center items-center gap-7 border-2 w-full md:w-[80%] backdrop-blur-3xl border-b rounded-xl">
      <h1 className="font-extrabold text-2xl mb-5">Set Notification</h1>
      <div className="w-full md:w-[60%] flex items-center gap-3">
        <Image src={tokenObj[0].icon} alt={tokenObj[0].icon} width="50" height="50" />
        <p className="font-bold">{tokenObj[0].symbol}</p>
        <p className="font-bold text-sm text-c_Litegrey">{tokenObj[0].name}</p>
      </div>
      <input
        type="text"
        defaultValue={"name"}
        onChange={(e) => setTokenPrice(e.target.value)}
        className="bg-transparent rounded-lg border-2 p-2 w-full md:w-[60%]"
      />
      <Button
        variant={"primary"}
        size={"small"}
        className="w-full md:w-[60%] font-bold py-2 bg-c_White text-c_black"
      >
        Submit
      </Button>
    </div>
  );
};

export default SetNotification;
