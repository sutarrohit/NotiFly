import {
  customError,
  IcreateNotification,
  IGraphQLContext,
  IsendNotificationToQueue,
} from "@notifly/lib";
import jwt from "jsonwebtoken";
import { prismaClient } from "@notifly/prisma";
import { GraphQLError } from "graphql";

class NotificationService {
  public static async createNotification(input: IcreateNotification, context: IGraphQLContext) {
    try {
      if (!context.authToken || !input.price)
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: customError.UNAUTHORIZED,
        });

      const verifyToken = jwt.verify(context.authToken, "this_is_ranodin_string");
      const { email }: any = verifyToken;
      const user = await prismaClient.user.findUnique({ where: { email: email } });

      if (!user)
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: customError.UNAUTHORIZED,
        });

      const newNotification = await prismaClient.notifications.create({
        data: {
          targetPrice: input.price,
          token: input.token,
          active: true,
          userId: user.id,
          receiverEmail: user.email as string,
          CreatedAt: new Date(),
          notificationType: "Price",
          uptrend: input.upTrend,
        },
      });

      if (!newNotification)
        throw new GraphQLError("Unable to create new notification", {
          extensions: customError.UNAUTHORIZED,
        });

      return "Notification created successfully.";
    } catch (error) {
      return error;
    }
  }

  public static async getAllNotification() {
    try {
      const notifications: any = await prismaClient.notifications.findMany({
        where: {
          active: true,
        },
        select: {
          token: true,
          targetPrice: true,
          uptrend: true,
        },
      });

      const uniqueNotifications = notifications.reduce((result: any, notification: any) => {
        const { token, targetPrice, uptrend } = notification;

        const existingEntry = result.find(
          (item: any) => item.token === token && item.uptrend === uptrend,
        );

        if (existingEntry) {
          existingEntry.targetPrice.push(targetPrice);
        } else {
          result.push({
            token,
            targetPrice: [targetPrice],
            uptrend,
          });
        }

        return result;
      }, []);

      console.log("uniqueNotificationsArray", uniqueNotifications);
      return uniqueNotifications;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public static async sendNotificationToQueue(input: IsendNotificationToQueue) {
    try {
      const notifications = await prismaClient.notifications.findMany({
        where: {
          token: input.token,
          active: true,
          targetPrice: {
            in: input.prices,
          },
        },
      });
      // const notificationIds = notifications.map((notification) => notification.id);
      // const updatedNotifications = await prismaClient.notifications.updateMany({
      //   where: {
      //     id: {
      //       in: notificationIds,
      //     },
      //   },
      //   data: {
      //     active: false,
      //   },
      // });

      return notifications;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default NotificationService;
