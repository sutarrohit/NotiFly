import { getClient } from "../apolloClient";
import { gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query Query {
    getUsers(email: "rohit6")
  }
`;

const Header = async () => {
  const { data, loading, networkStatus } = await getClient().query({
    query: GET_LOCATIONS,
  });

  console.log(loading);

  return (
    <div>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <>
          <div>{data.getUsers}</div>
          <div>{data.getUsers}</div>
        </>
      )}
    </div>
  );
};

export default Header;
