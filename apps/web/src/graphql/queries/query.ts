import { gql } from "@apollo/client";

export const verifyJWT = gql`
  query verifyJWT($token: String) {
    verifyJWT(token: $token)
  }
`;

export const getUsetNotification = gql`
  query GetUserNotification {
    getUserNotification {
      userId
      token
      targetPrice
      notificationType
      receiverEmail
      id
      active
      CreatedAt
      DeliveredAt
    }
  }
`;
