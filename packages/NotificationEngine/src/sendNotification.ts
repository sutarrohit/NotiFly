import axios from "axios";
const graphqlEndpoint = "http://localhost:8000/graphql";
const mutation = `
  mutation Mutation($token: String, $prices: [Float]) {
    sendNotificationToQueue(token: $token, prices: $prices) {
      id
      targetPrice
      token
      active
      receiverEmail
      createdAt
      uptrend
      notificationType
      deliveredAt
      userId
    }
  }
`;
export function sendNotifcationToQueue(token: String, prices: number[]) {
  try {
    const variables = {
      token: token,
      prices: prices,
    };
    axios
      .post(graphqlEndpoint, {
        query: mutation,
        variables: variables,
      })
      .then((response) => {
        console.log("response.......", response.data.data.sendNotificationToQueue);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  } catch (error: any) {
    console.log(error.message);
  }
}
