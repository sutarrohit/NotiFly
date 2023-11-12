import Image from "next/image";
import { getClient } from "../apolloClient";
import { gql } from "@apollo/client";
import Header from "./components/Header";

const GET_LOCATIONS = gql`
  query Query {
    getUsers(email: "rohit6")
  }
`;

export default async function Home() {
  const data = await getClient().query({ query: GET_LOCATIONS });

  return (
    <div>
      <Header />
      {/* <div>{data.data.getUsers}</div>
      <div>{data.data.getUsers}</div> */}
    </div>
  );
}
