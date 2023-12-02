import Link from "next/link";

const Footer = () => {
  return (
    <div className="border-t flex justify-center h-[15rem] mt-10 md:mt-2">
      <div className="w-[90%] grid grid-col-1 md:grid-cols-2">
        {/* Left */}
        <div className="flex flex-col justify-between p-4">
          <h1 className="text-2xl font-extrabold">NotiFly</h1>
          <h1 className="text-sm font-bold">© 2023 NotiFly. All rights reserved</h1>
        </div>

        {/* Right */}
        <div className="text-lg font-bold flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact us</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
