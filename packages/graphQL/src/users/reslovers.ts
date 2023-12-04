import { IcreateUser, IloginUser } from "@notifly/lib";
import AuthService from "../services/auth/authService";

const queries = {
  getUsers: async (_: any, { email }: { email: string }) => {
    const user: any = await AuthService.getUser(email);
    return "This isdjkhuhhhhjj Query";
  },

  verifyJWT: async (_: any, { token }: { token: string }) => {
    const response = await AuthService.verifyJWT(token);
    return response;
  },
};
const mutations = {
  createUser: async (_: any, input: IcreateUser, context: any) => {
    const user = await AuthService.createUser(input);
    return user;
  },

  loginUser: async (_: any, input: IloginUser, context: any) => {
    const response = await AuthService.loginUser(input, context);
    return response;
  },

  userLogout: async (_: any, email: string, context: any) => {
    const response = await AuthService.UserLogout(context);
    return response;
  },

  googleLogin: async (_: any, input: { email: string; sessionToken?: string }, context: any) => {
    const response = await AuthService.googleLogin(input, context);
    return response;
  },

  verifyUser: async (_: any, input: { verificationToken: string }, context: any) => {
    const response = await AuthService.verifyUser(input, context);
    return response;
  },

  forgotPassword: async (_: any, { email }: { email: string }) => {
    const response = await AuthService.forgotPassword(email);
    return response;
  },
  resetPassword: async (_: any, payload: { token: string; newPassword: string }, context: any) => {
    const response = await AuthService.resetPassowrd(payload, context);
    return response;
  },
};

export const userReslovers = { queries, mutations };
