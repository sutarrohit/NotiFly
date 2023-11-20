import { IcreateUser, IloginUser } from "@notifly/interfaces";
import AuthService from "../services/auth/authService";

const queries = {
  getUsers: async (_: any, { email }: { email: string }) => {
    const user: any = await AuthService.getUser(email);
    return user.userName;
  },
};
const mutations = {
  createUser: async (_: any, input: IcreateUser, context: any) => {
    const user = await AuthService.createUser(input);
    return user;
  },

  loginUser: async (_: any, input: IloginUser, context: any) => {
    const token = await AuthService.loginUser(input);
    context.res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 30 * 60 * 60 * 1000),
    });
    return token;
  },

  forgotPassword: async (_: any, { email }: { email: string }) => {
    const response = await AuthService.forgotPassword(email);
    return response;
  },
  resetPassword: async (_: any, payload: { token: string; newPassword: string }, context: any) => {
    const token = await AuthService.resetPassowrd(payload);
    context.res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 30 * 60 * 60 * 1000),
    });
    return token;
  },
};

export const userReslovers = { queries, mutations };
