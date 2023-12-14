import NotificationServices from "../services/Notification/NotificationServices";
import { IGraphQLContext, IcreateNotification, IsendNotificationToQueue } from "@notifly/lib";
export const queries = {
  getAllNotifications: async (_: any) => {
    const response = await NotificationServices.getAllNotification();
    return response;
  },

  getUserNotification: async (_: any, input: any, context: IGraphQLContext) => {
    const response = await NotificationServices.getUserNotification(context);
    return response;
  },
};

export const mutations = {
  createNotification: async (_: any, input: IcreateNotification, context: IGraphQLContext) => {
    const response = NotificationServices.createNotification(input, context);
    return response;
  },

  sendNotificationToQueue: async (_: any, input: IsendNotificationToQueue) => {
    const response = await NotificationServices.sendNotificationToQueue(input);
    return response;
  },

  updateNotificationDeliveredTime: async (
    _: any,
    { deliveredNotifications }: { deliveredNotifications: string[] },
    context: IGraphQLContext,
  ) => {
    const response = await NotificationServices.updateNotificationDeliveredTime(
      deliveredNotifications,
      context,
    );
    return response;
  },
};

export const NotificationResolvers = { queries, mutations };
