"use client";
import { useQuery, useSuspenseQuery, gql } from "@apollo/client";
import { GetUserNotificationDocument } from "@/graphql/__generated__/graphql";
import { Loader } from "@notifly/ui";
import Image from "next/image";

const MyNotificationForm = () => {
  const { loading, error, data } = useQuery(GetUserNotificationDocument);

  const sortedNotifications = data?.getUserNotification
    ? [...data.getUserNotification].sort((a: any, b: any) => {
        return parseInt(b.CreatedAt) - parseInt(a.CreatedAt);
      })
    : [];

  if (loading)
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className="flex flex-col gap-4 text-sm md:text-[1rem] ">
      <div className="border bg-c_grey rounded-sm font-bold text-c_White grid grid-cols-3 md:grid-cols-10 gap-2 md:gap-8 py-2 mb-2">
        <p className="md:col-span-3 ml-4 md:ml-10">Name</p>
        <p className="md:col-span-1 ">Status</p>
        <p className="md:col-span-2 md:text-center">CreatedAt</p>
        <p className="md:col-span-2 hidden md:block text-center">TargetPrice</p>
        <p className="md:col-span-2 hidden md:block">DeliveredAt</p>
      </div>

      {sortedNotifications.map((element, key) => {
        const createdAtDate = element.CreatedAt ? new Date(parseInt(element.CreatedAt || "")) : null;
        const formatedCreatedAtDate = createdAtDate?.toLocaleDateString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        const deliveredAt = element.DeliveredAt ? new Date(parseInt(element.DeliveredAt || "")) : null;
        const formatedDeliveredAt = deliveredAt?.toLocaleDateString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        const iconsId = "/icons/" + element.token?.split("USDT")[0].toLocaleLowerCase();

        return (
          <div key={key}>
            <div className="border dark:border-2 border-c_grey rounded-lg grid grid-cols-3 md:grid-cols-10 items-center gap-2 md:gap-8 py-2">
              <div className="md:col-span-3 flex items-center gap-2 md:gap-4 ml-2 md:ml-5">
                <Image
                  src={`${iconsId + ".png"}` || `${iconsId + ".jpg"}`}
                  alt={element.token || ""}
                  width="40"
                  height="40"
                />
                <p className="">{element.token?.split("USDT")}</p>
              </div>
              <p className="md:col-span-1">{element.active ? "Pending" : "Delivered"}</p>
              <p className="md:col-span-2 md:text-center">{formatedCreatedAtDate}</p>
              <p className="md:col-span-2 hidden md:block text-center">${element.targetPrice}</p>
              <p className="md:col-span-2 md:mr-4 hidden md:block">{formatedDeliveredAt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyNotificationForm;
