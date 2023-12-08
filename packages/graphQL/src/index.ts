import { ApolloServer } from "@apollo/server";
import { Users } from "./users";
import { Notification } from "./Notifications";

export const server = new ApolloServer({
  typeDefs: `#graphql

  ${Users.userTypeDefs}
  ${Notification.NotificationTypeDefs}

        type Query {
          ${Users.userQueries}
        
        }

        type Mutation {
          ${Users.userMutation}
          ${Notification.NotificationMutation}
        }
        `,

  resolvers: {
    Query: {
      ...Users.userReslovers.queries,
    },
    Mutation: {
      ...Users.userReslovers.mutations,
      ...Notification.NotificationResolvers.mutations,
    },
  },

  formatError: (error) => {
    if (process.env.NODE_ENV === "production") {
      const { locations, path, ...formattedError } = error;
      return formattedError;
    } else {
      const { ...formattedError } = error;
      return formattedError;
    }
  },
});
function getUserFromToken(token: any) {
  throw new Error("Function not implemented.");
}
