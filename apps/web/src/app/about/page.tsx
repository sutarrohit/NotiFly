import React from "react";
import Image from "next/image";

const Aboutus = () => {
  return (
    <div className="relative min-h-[90vh] flex justify-center">
      <div className="w-[90%]">
        <div className="grid md:grid-cols-2 min-h-full ">
          <div className="flex justify-center items-center">
            <Image src="./images/141.svg" alt="aboutWhite" width="1000" height="1000" />
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-xl md:text-7xl font-bold">About us</h1>
            <p className="leading-relaxed text-sm font-bold text-[1rem] text-center md:w-[80%]">
              Welcome to NotiFly, where we redefine your crypto experience. We deliver real-time notifications
              that empower you to make informed decisions in the fast-paced world of digital assets. With a
              user-friendly interface and comprehensive market coverage, we ensure you never miss a beat in
              the crypto space.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
