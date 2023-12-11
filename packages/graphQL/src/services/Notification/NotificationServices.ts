import { customError, IcreateNotification, IGraphQLContext } from "@notifly/lib";
import jwt from "jsonwebtoken";
import { prismaClient } from "@notifly/prisma";
import { GraphQLError } from "graphql";
import { NOTIFICATION } from "@notifly/ui/components/SetNotification";

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
        select: {
          token: true,
          targetPrice: true,
        },
      });

      type NotificationTokenSet = {
        [token: string]: number[];
      };

      const tokenPrices: NotificationTokenSet = notifications.reduce(
        (result: any, notification: any) => {
          const { token, targetPrice } = notification;

          if (!result[token]) {
            result[token] = [];
          }
          if (!result[token].includes(targetPrice)) {
            result[token].push(targetPrice);
          }
          return result;
        },
        {},
      );
      console.log("NOTIFICATION", tokenPrices);
      return tokenPrices;
    } catch (error) {
      console.log(error);
    }
  }
}

export default NotificationService;
