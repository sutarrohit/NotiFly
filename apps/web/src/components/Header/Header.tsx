import { IoLogoStencil } from "react-icons/io5";
import { DarkMode, MenuButton } from "@notifly/ui";
import HeaderButton from "./HeaderButton";
import Link from "next/link";
import { cookies } from "next/headers";

const Header = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("AuthToken")?.value || "";

  return (
    <div className="sticky top-0 z-10 w-full flex justify-center backdrop-blur-xl border-b border-c_Litegrey">
      <div className="w-[90%] h-[4.2rem] flex justify-between items-center">
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
        <div className="flex gap-3 items-center">
          <div className="hidden md:flex">
            <HeaderButton token={token} />
          </div>

          <div className="hidden md:block">
            <DarkMode />
          </div>

          <MenuButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
