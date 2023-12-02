import React from "react";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { FaEthereum, FaBitcoin } from "react-icons/fa";
import Image from "next/image";
import HeroSectionButton from "./HeroSectionButton";
import { TbCurrencySolana } from "react-icons/tb";

const HeroSection = () => {
  return (
    <div className=" min-h-[200vh] md:min-h-[92vh] flex justify-center">
      <div className="w-[90%]  flex flex-col gap-10">
        {/* Top Card */}

        <div className="grid grid-cols-3 gap-6 md:px-10  mt-12 text-c_White">
          <div className=" border px-2 py-14 md:px-6 md:py-16 rounded-xl col-span-3 md:col-span-2 flex flex-col gap-4 justify-center bg-gradient-to-r from-[#323132] via-purple-[#272627] via-purple-[#1c1c1c] to-[#111111]">
            <h1 className="text-[1.8rem] md:text-[3rem] font-bold md:w-[60%] leading-tight">
              <span className="flex gap-4 relative">
                UNLOCK
                <div className="flex text-2xl items-center relative text-c_black">
                  <div className="rounded-full p-2 md:p-3 bg-orange-400">
                    <BsCurrencyBitcoin />
                  </div>
                  <div className="rounded-full p-2 md:p-3 bg-c_LightGreen relative left-[-0.6rem]">
                    <FaEthereum />
                  </div>
                </div>
              </span>
              THE POWER OF CRYPTO
            </h1>
            <p className="md:w-[50%] text-sm">
              Stay Ahead, Stay Informed: Unleashing the Power of Crypto Notifications for Your Financial
              Freedom.
            </p>
          </div>
          <div className="border-2 rounded-lg flex justify-center items-center col-span-3 md:col-span-1 p-10 text-[12rem] md:text-[18rem] bg-gradient-to-r from-[#323132] via-purple-[#272627] via-purple-[#1c1c1c] to-[#111111]">
            <Image
              src="/images/EthereumLogo.png"
              alt="Example Image"
              width={150}
              height={100}
              className="w-[50%]"
            />
          </div>
        </div>

        {/* Bottom card */}
        <div className="md:px-10 text-c_White">
          {/* card */}

          {/* Bitcoin */}
          <div className="grid md:grid-cols-3 gap-5 justify-center items-center]">
            <div className="rounded-xl flex flex-col justify-center items-center gap-4 border py-10 p-6 bg-gradient-to-r from-[#323132] via-purple-[#272627] via-purple-[#1c1c1c] to-[#111111]">
              <div className="rounded-full p-4 text-5xl bg-orange-400 text-c_black">
                <BsCurrencyBitcoin />
              </div>
              <p className="font-bold"> Create a Notification for Bitcoin. </p>
              <div className="w-[100%] mt-5">
                <HeroSectionButton />
              </div>
            </div>

            {/* Ethereum */}
            <div className="rounded-xl flex flex-col justify-center items-center gap-4 border p-6 bg-gradient-to-r from-[#323132] via-purple-[#272627] via-purple-[#1c1c1c] to-[#111111]">
              <div className="rounded-full p-4 text-5xl bg-c_LightGreen text-c_black">
                <FaEthereum />
              </div>
              <p className="font-bold"> Create a Notification for Ethereum. </p>
              <div className="w-[100%] mt-5">
                <HeroSectionButton />
              </div>
            </div>

            {/* Solana */}
            <div className="rounded-xl flex flex-col justify-center items-center gap-4 border p-6 bg-gradient-to-r from-[#323132] via-purple-[#272627] via-purple-[#1c1c1c] to-[#111111]">
              <div className="rounded-full p-4 text-5xl bg-c_Blue text-c_black">
                <TbCurrencySolana />
              </div>
              <p className="font-bold"> Create a Notification for Solana. </p>
              <div className="w-[100%] mt-5">
                <HeroSectionButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
