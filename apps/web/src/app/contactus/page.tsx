/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import { InputBox, Button } from "@notifly/ui";

const Contactus = () => {
  return (
    <div className="relative min-h-screen md:min-h-[90vh] flex justify-center">
      <div className="w-[90%]">
        <div className="grid md:grid-cols-2 min-h-full ">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl md:text-6xl font-bold">Contact us</h1>
            <p className="leading-relaxed text-sm text-[1rem] text-center md:w-[80%]">
              Have a question or feedback? We'd love to hear from you! Feel free to reach out through the
              contact form. We value your input and are committed to providing a swift and helpful response.
            </p>
          </div>
          <div className="flex justify-center items-center">
            {/* card */}

            <div className="border-2 border-c_grey rounded-lg w-[90%] md:w-[90%] xl:w-[65%] p-5 md:p-10 flex flex-col gap-4 ">
              <div className="flex flex-col gap-1">
                <label htmlFor="">Name</label>
                <InputBox type="text" className="p-2" placeholder="Enter name" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="">Email</label>
                <InputBox type="email" className="p-2" placeholder="Enter email" />
              </div>

              <div className="flex border border-c_grey rounded-lg">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  className=" rounded-lg resize-none w-full bg-transparent h-[8rem] md:h-[9rem] focus:outline-none p-2"
                />
              </div>
              <div className="">
                <Button variant={"secondary"} className="w-full p-2 font-bold">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
