import SignupForm from "./SignupForm";
import { AnimatedHeader } from "@notifly/ui";
const page = () => {
  return (
    <div className="min-h-[92vh] flex justify-center items-center">
      <div className="min-w-[90%] md:border md:border-c_Litegrey rounded-lg grid md:grid-cols-2 h-[85vh] overflow-hidden">
        {/* left */}

        <div className=" bg-c_black dark:bg-c_grey text-c_White hidden md:flex justify-center items-center">
          <div className="ml-5   md:w-[30rem] h-[30rem] flex flex-col justify-center ">
            <AnimatedHeader fontSize="2.8rem" words="Welcome to NotiFly" courser="|" typeSpeed={100} />
            <AnimatedHeader
              fontSize="1rem"
              words="Unleashing the Power of Crypto Notifications for Your Financial Freedom"
              courser="."
              typeSpeed={100}
            />
          </div>
        </div>

        {/* card */}
        <div className="flex justify-center items-center">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default page;
