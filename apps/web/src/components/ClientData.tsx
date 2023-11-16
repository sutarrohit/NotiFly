"use client";
import { gql, useQuery } from "@apollo/client";

const GET_LOCATIONS = gql`
  query Query {
    getUsers(email: "rohit4")
  }
`;

const ClientData = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  console.log("data", data);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      ClientData
      <div>{data.getUsers}</div>
    </div>
  );
};

export default ClientData;
