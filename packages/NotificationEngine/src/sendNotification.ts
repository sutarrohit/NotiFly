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
    const cookies = `AuthToken=${process.env.SERVER_COOKIES}`;
    const variables = {
      token: token,
      prices: prices,
    };
    axios
      .post(
        graphqlEndpoint,
        {
          query: mutation,
          variables: variables,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: cookies,
          },
        },
      )
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
