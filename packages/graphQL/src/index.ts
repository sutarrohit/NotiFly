import { ApolloServer } from "@apollo/server";
import { Users } from "./users";

export const server = new ApolloServer({
  typeDefs: `#graphql

  ${Users.userTypeDefs}

        type Query {
          ${Users.userQueries}
        }

        type Mutation {
          ${Users.userMutation}
        }
        `,

  resolvers: {
    Query: {
      ...Users.userReslovers.queries,
    },
    Mutation: {
      ...Users.userReslovers.mutations,
    },
  },
});
