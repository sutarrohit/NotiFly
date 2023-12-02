import LoginForm from "./LoginForm";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apolloClient";
import { AnimatedHeader } from "@notifly/ui";

const GET_LOCATIONS = gql`
  query Query {
    getUsers(email: "rohit6")
  }
`;

const LoginPage = async () => {
  const { data } = await getClient().query({ query: GET_LOCATIONS });
  console.log("myData", data);

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
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
