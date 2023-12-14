"use client";
import Image from "next/image";
import { Button } from "@notifly/ui";
import { tokenData } from "@notifly/lib";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
import Link from "next/link";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { useRef, useCallback, MouseEventHandler } from "react";
import { useRecoilState } from "recoil";
import { openSideMenu } from "@notifly/recoil";

const PriceSocket = () => {
  const [liveTokenPrice, setLiveTokenPrice] = useState();
  const [visibleItems, setVisibleItems] = useState(0);
  const overlay = useRef(null);
  const [sideMenu, setSideMenu] = useRecoilState(openSideMenu);

  const nextPage = () => {
    if (visibleItems + 15 < tokenData.length) setVisibleItems(visibleItems + 15);
  };
  const prevPage = () => {
    if (visibleItems > 0) setVisibleItems(visibleItems - 15);
  };

  const { getWebSocket } = useWebSocket("ws://localhost:1337");
  getWebSocket()?.addEventListener("message", (event: any) => {
    let tokenPriceData = JSON.parse(event.data);
    setLiveTokenPrice(tokenPriceData);
  });

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      setSideMenu(false);
    },
    [overlay],
  );

  return (
    <div ref={overlay} onClick={onClick} className="min-h-screen w-[90%]">
      {/* Title */}
      <div>
        <div className="bg-c_grey py-2 px-3 grid grid-cols-3 mt-10 text-sm font-extrabold text-c_White">
          <div className="flex gap-8">
            <div className="hidden md:block ml-4">#</div>
            <div className="md:ml-5">Name</div>
          </div>
          <div className="md:ml-4">Price</div>
          <div className="md:ml-10">Notification</div>
        </div>
        {/* card */}
        {tokenData.slice(visibleItems, visibleItems + 15).map((element, key) => {
          return (
            <div key={key} className="border-b-[0.06rem] border-c_grey py-4 md:p-4 grid grid-cols-3">
              <div className="flex items-center gap-2 md:gap-5">
                <div className="hidden md:block ml-3 text-sm text-c_Litegrey">{element.id}</div>
                <Image src={element.icon} alt={element.symbol} width="30" height="30" />
                <div className="flex">
                  <span className="text-sm font-bold">{element.symbol}</span>
                  <span className="hidden md:block ml-3 text-sm text-c_Litegrey">{element.name}</span>
                </div>
              </div>

              <span className="flex items-center text-sm font-semibold">
                $
                {liveTokenPrice && liveTokenPrice[element.price] > 10
                  ? parseFloat(liveTokenPrice[element.price]).toFixed(2)
                  : liveTokenPrice && liveTokenPrice[element.price] > 0.1
                  ? parseFloat(liveTokenPrice[element.price]).toFixed(4)
                  : liveTokenPrice && liveTokenPrice[element.price]}
              </span>

              <div>
                <Link
                  href={`/setNotification/${element?.symbol}/${
                    liveTokenPrice && liveTokenPrice[element.price] > 10
                      ? parseFloat(liveTokenPrice[element.price]).toFixed(2)
                      : liveTokenPrice && liveTokenPrice[element.price] > 0.1
                      ? parseFloat(liveTokenPrice[element.price]).toFixed(4)
                      : (liveTokenPrice && liveTokenPrice[element.price]) || 0
                  }`}
                >
                  <Button
                    variant={"secondary"}
                    size={"small"}
                    className="w-[90%] md:w-[80%] lg:w-[60%] xl:w-[45%] md:py-2 text-sm font-extrabold"
                  >
                    <span className="hidden md:inline-block">Create Notification</span>
                    <span className="inline-block md:hidden">Create</span>
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}

        {/* nav buttons */}
        <div className="mt-10 flex justify-end gap-4 text-sm">
          <Link href="/">
            <Button
              variant={"secondary"}
              size={"thiny"}
              className="py-[0.3rem] px-[1rem] font-extrabold"
              onClick={() => prevPage()}
            >
              <GrCaretPrevious className="mr-2" />
              Prev
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant={"primary"}
              size={"thiny"}
              className="py-[0.3rem] px-[1rem] font-extrabold"
              onClick={() => nextPage()}
            >
              Next
              <GrCaretNext className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PriceSocket;
