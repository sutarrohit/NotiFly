import React from "react";
import { Modal, SetNotification } from "@notifly/ui";

const Token = ({ params }: { params: { token: string } }) => {
  return (
    <Modal>
      <div className="flex w-[100%] justify-center md:w-[100%]">
        <SetNotification token={params.token} />
      </div>
    </Modal>
  );
};

export default Token;
