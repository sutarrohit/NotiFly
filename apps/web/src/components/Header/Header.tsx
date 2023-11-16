import { IoLogoStencil } from "react-icons/io5";
import { DarkMode } from "@notifly/ui";

const Header = () => {
  return (
    <div className="border border-pink-500 w-full flex justify-center">
      <div className="w-[90%] border border-yellow-500 h-[3.5rem] flex justify-between items-center">
        {/* Left Side */}
        <div>
          <div className="flex items-center gap-1 text-2xl font-bold">
            <IoLogoStencil />
            <h2>NotiFly</h2>
          </div>
        </div>

        {/* Right Side */}
        <div className="">
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default Header;
