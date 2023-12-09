"use client";
import { RiMenu4Line } from "react-icons/ri";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { openSideMenu } from "@notifly/recoil";

const MenuButton = () => {
  const [sideMenu, setSideMenu] = useRecoilState(openSideMenu);
  return (
    <div
      onClick={() => setSideMenu(!sideMenu)}
      className=" md:hidden border-[0.06rem] rrounded-sm flex justify-center items-center dark:bg-c_grey bg-c_black text-white text-xl px-1.5 h-8"
    >
      <RiMenu4Line />
    </div>
  );
};

export default MenuButton;
