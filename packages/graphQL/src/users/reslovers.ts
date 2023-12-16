import { IcreateUser, IloginUser, IGraphQLContext } from "@notifly/lib";
import AuthService from "../services/auth/authService";

const queries = {
  // getUsers: async (_: any, { email }: { email: string }) => {
  //   const user: any = await AuthService.getUser(email);
  //   return "This is to test server";
  // },

  // getServerJwtToken: async (_: any) => {
  //   const response = await AuthService.getServerJwtToken();
  //   return response;
  // },

  verifyJWT: async (_: any, { token }: { token: string }) => {
    const response = await AuthService.verifyJWT(token);
    return response;
  },
};
const mutations = {
  createUser: async (_: any, input: IcreateUser, context: IGraphQLContext) => {
    const user = await AuthService.createUser(input);
    return user;
  },

  loginUser: async (_: any, input: IloginUser, context: IGraphQLContext) => {
    const response = await AuthService.loginUser(input, context);
    return response;
  },

  userLogout: async (_: any, email: string, context: IGraphQLContext) => {
    const response = await AuthService.UserLogout(context);
    return response;
  },

  googleLogin: async (
    _: any,
    input: { email: string; sessionToken?: string },
    context: IGraphQLContext,
  ) => {
    const response = await AuthService.googleLogin(input, context);
    return response;
  },

  verifyUser: async (_: any, input: { verificationToken: string }, context: IGraphQLContext) => {
    const response = await AuthService.verifyUser(input, context);
    return response;
  },

  forgotPassword: async (_: any, { email }: { email: string }) => {
    const response = await AuthService.forgotPassword(email);
    return response;
  },
  resetPassword: async (
    _: any,
    payload: { token: string; newPassword: string },
    context: IGraphQLContext,
  ) => {
    const response = await AuthService.resetPassowrd(payload, context);
    return response;
  },
};

export const userReslovers = { queries, mutations };
