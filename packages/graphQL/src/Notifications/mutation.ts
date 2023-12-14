export const NotificationMutation = `#graphql
createNotification(token:String, price:Float, type:String, upTrend:Boolean):String
sendNotificationToQueue(token:String, prices:[Float]):[SendNotificationToQueue]
updateNotificationDeliveredTime(deliveredNotifications:[String]):Boolean
`;
