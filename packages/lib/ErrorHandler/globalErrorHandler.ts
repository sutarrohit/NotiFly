import { GraphQLError } from "graphql";
import { customError } from "@notifly/lib";

export const appError = (message: string, errorCode?: any) => {
  console.log("he there", { ...errorCode });

  throw new GraphQLError(message, {
    extensions: {
      code: "UNAUTHORIZED",
      http: {
        status: 401,
      },
    },
  });
};
