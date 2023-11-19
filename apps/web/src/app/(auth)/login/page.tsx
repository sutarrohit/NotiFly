import LoginForm from "./LoginForm";
import { gql } from "@apollo/client";
import { getClient } from "../../../lib/apolloClient";

const GET_LOCATIONS = gql`
  query Query {
    getUsers(email: "rohit6")
  }
`;

const LoginPage = async () => {
  //const { data } = await getClient().query({ query: GET_LOCATIONS });

  return (
    <div className="min-h-[92vh] flex justify-center items-center">
      <div className="min-w-[90%] md:border md:border-c_Litegrey rounded-lg grid md:grid-cols-2 h-[85vh] overflow-hidden">
        {/* left */}
        <div className="bg-c_black dark:bg-c_grey text-c_White hidden md:block">Left Side</div>
        <div className="flex justify-center items-center">
          {/* card */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
