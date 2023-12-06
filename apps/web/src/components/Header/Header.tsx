import { IoLogoStencil } from "react-icons/io5";
import { DarkMode } from "@notifly/ui";
import ButtonUI from "./HeaderButton";
import Link from "next/link";
import { cookies } from "next/headers";

const Header = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("AuthToken")?.value || "";

  return (
    <div className="sticky top-0 z-50 w-full flex justify-center backdrop-blur-xl border-b border-c_Litegrey">
      <div className="w-[90%] h-[3.8rem] flex justify-between items-center">
        {/* Left Side */}
        <div>
          <div className="flex items-center gap-1 text-2xl font-bold">
            <IoLogoStencil />

            <Link href="/">
              <h2>NotiFly</h2>
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex gap-3 ">
          <div className="hidden md:flex">
            <ButtonUI token={token} />
          </div>

          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default Header;
