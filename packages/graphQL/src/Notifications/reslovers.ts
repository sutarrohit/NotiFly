import NotificationServices from "../services/Notification/NotificationServices";
import { IGraphQLContext, IcreateNotification } from "@notifly/lib";
export const queries = {};

export const mutations = {
  createNotification: async (_: any, input: IcreateNotification, context: IGraphQLContext) => {
    const response = NotificationServices.createNotification(input, context);
    return response;
  },
};

export const NotificationResolvers = { queries, mutations };
