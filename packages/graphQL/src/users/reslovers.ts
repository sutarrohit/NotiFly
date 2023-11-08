import { prisma } from "@notify/prisma";

const queries = {
  getUsers: async () => {
    return "This is query";
  },
};
const mutations = {
  createUser: async (obj: any, arg: any, context: any, info: any) => {
    console.log("obj", obj);
    console.log("arg", arg);
    // console.log("context", context);
    // console.log("info", info);
    return { name: arg.name, age: arg.age, id: arg.id };
  },
};

export const userReslovers = { queries, mutations };
