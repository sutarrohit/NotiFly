import React from "react";
import { Modal, SetNotification } from "@notifly/ui";

const Token = ({ params }: { params: { token: string } }) => {
  console.log("params", params.token[0]);
  console.log("price", params.token[1]);
  return (
    <Modal>
      <div className="flex w-[100%] justify-center md:w-[100%]">
        <SetNotification token={params.token[0]} price={params.token[1]} />
      </div>
    </Modal>
  );
};

export default Token;
