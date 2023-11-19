import { IcreateUser, IloginUser } from "@notifly/interfaces";
import AuthService from "../services/auth/authService";

const queries = {
  getUsers: async (_: any, { email }: { email: string }) => {
    const user: any = await AuthService.getUser(email);

    return user.userName;
  },

  errorHandling: async (_: any, { email }: { email: string }) => {
    const user: any = await AuthService.errorHandling(email);
    return user;
  },
};
const mutations = {
  createUser: async (_: any, input: IcreateUser) => {
    const user = await AuthService.createUser(input);
    return user;
  },

  loginUser: async (_: any, input: IloginUser) => {
    const response = await AuthService.loginUser(input);
    return response;
  },

  forgotPassword: async (_: any, { email }: { email: string }) => {
    const response = await AuthService.forgotPassword(email);
    return response;
  },
  resetPassword: async (_: any, payload: { token: string; newPassword: string }) => {
    const response = await AuthService.resetPassowrd(payload);
    return response;
  },
};

export const userReslovers = { queries, mutations };
