import Link from "next/link";
import { FaGithubSquare, FaTwitterSquare, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="border-t flex justify-center h-[15rem] mt-10 md:mt-2">
      <div className="w-[90%] grid grid-col-1 md:grid-cols-2">
        {/* Left */}
        <div className="flex flex-col justify-between p-4">
          <h1 className="text-2xl font-extrabold">NotiFly</h1>
          <h1 className=" hidden md:block text-sm font-bold">© 2023 NotiFly. All rights reserved</h1>
        </div>

        {/* Right */}
        <div className="font-bold flex flex-col justify-between md:items-center p-6">
          <div className="flex gap-5">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contactus">Contact us</Link>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4 text-3xl">
            <Link href="https://github.com/sutarrohit" target="_blank">
              <FaGithubSquare />
            </Link>
            <Link href="https://twitter.com/imSrohitS" target="_blank">
              <FaTwitterSquare />
            </Link>
            <Link href="https://www.linkedin.com/in/rohit-sutar-89687a1b6/" target="_blank">
              <FaLinkedin />
            </Link>
          </div>
          <h1 className="block mt-10 md:hidden text-sm font-bold">© 2023 NotiFly. All rights reserved</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
