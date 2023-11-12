import { PrismaClient } from "@prisma/client";
import { CreateUserInput, LoginUserInput } from "@notifly/lib";

export const prismaClient = new PrismaClient().$extends({
  query: {
    user: {
      // create({ args, query }) {
      //   args.data = CreateUserInput.parse(args.data);
      //   return query(args);
      // },
      // findUnique({ args, query }) {
      //   args.where = LoginUserInput.parse(args);
      //   return query(args);
      // },
    },
  },
});
