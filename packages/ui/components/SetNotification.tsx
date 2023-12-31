"use client";
import { useEffect, useState } from "react";
import { tokenData } from "@notifly/lib";
import { useMutation, gql } from "@apollo/client";
import { ZNotificationTokenPrice } from "@notifly/lib";
import Loader from "./Loader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { toast } from "react-toastify";
import { FaWindowClose } from "react-icons/fa";

export const NOTIFICATION = gql`
  mutation createNotification($token: String, $price: Float, $type: String, $upTrend: Boolean) {
    createNotification(token: $token, price: $price, type: $type, upTrend: $upTrend)
  }
`;

const SetNotification = ({ token, price }: { token: string; price: string }) => {
  const tokenObj = tokenData.filter((element) => element.symbol === token);
  const [tokenPrice, setTokenPrice] = useState(price);
  const [priceError, setPriceError] = useState("");
  const router = useRouter();

  const [createNotification, { data, loading, error }] = useMutation(NOTIFICATION);

  const handleSubmit = () => {
    try {
      ZNotificationTokenPrice.parse(parseFloat(tokenPrice));

      const tokenPair = token + "USDT";
      const UpTrend = price ? price <= tokenPrice : false;

      createNotification({
        variables: {
          token: tokenPair,
          price: parseFloat(tokenPrice),
          type: "Price",
          upTrend: UpTrend,
        },
      });
    } catch (error: any) {
      setPriceError(JSON.parse(error.message)[0].message);
    }
  };

  useEffect(() => {
    if (data) {
      toast.success("Notification Successfully Created!", {
        theme: "colored",
      });
    }
    if (error) {
      toast.error("Unable to Create Notification!", {
        theme: "colored",
      });
    }
  }, [data, error]);
  return (
    <div className="relative text-c_White flex flex-col p-10 justify-center items-center gap-7 border-2 w-full md:w-[70%] backdrop-blur-3xl border-b rounded-xl">
      <div onClick={() => router.back()} className="absolute cursor-pointer text-2xl top-2 right-4">
        <FaWindowClose />
      </div>
      <h1 className="font-extrabold text-2xl mb-4">Set Notification</h1>
      <div className="w-full md:w-[60%] flex items-center gap-3">
        <Image src={tokenObj[0]?.icon} alt={tokenObj[0]?.icon} width="50" height="50" />
        <p className="font-bold">{tokenObj[0]?.symbol}</p>
        <p className="font-bold text-sm text-c_Litegrey">{tokenObj[0]?.name}</p>
      </div>

      <div className="w-full flex flex-col items-center">
        <label htmlFor="" className="w-[97%] md:w-[60%] text-sm font-semibold">
          Select target price
        </label>
        <input
          type="text"
          defaultValue={price}
          onChange={(e) => {
            setTokenPrice(e.target.value), setPriceError("");
          }}
          className="bg-transparent rounded-lg border-2 px-6 py-2 w-full md:w-[60%] font-bold mt-1"
        />
        <p className="text-sm text-c_Orange mt-1 w-full md:w-[60%]">{priceError && priceError}</p>
        {/* <p className="text-sm text-c_Orange mt-1 w-full md:w-[60%]">{data && data.createNotification}</p> */}
      </div>

      <Button
        variant={"primary"}
        size={"small"}
        className="w-full md:w-[60%] font-bold py-2 bg-c_White text-c_black"
        disabled={loading}
        onClick={() => {
          handleSubmit();
        }}
      >
        {loading && <Loader />}
        Submit
      </Button>
    </div>
  );
};

export default SetNotification;
