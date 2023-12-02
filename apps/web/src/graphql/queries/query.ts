import { gql } from "@apollo/client";

export const verifyJWT = gql`
  query verifyJWT($token: String) {
    verifyJWT(token: $token)
  }
`;
