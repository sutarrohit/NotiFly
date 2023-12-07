import React from "react";
import { SetNotification } from "@notifly/ui";

const Token = ({ params }: { params: { token: string } }) => {
  return (
    <div className="min-h-[92vh] flex justify-center items-center">
      <div className="md:w-[90%] flex justify-center items-center">
        <div className="w-full md:w-1/2 flex justify-center bg-c_grey rounded-lg dark:bg-c_black py-10">
          <SetNotification token={params.token} />
        </div>
      </div>
    </div>
  );
};

export default Token;
