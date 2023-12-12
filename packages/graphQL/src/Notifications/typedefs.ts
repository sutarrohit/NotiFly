export const NotificationTypeDefs = `#graphql
type CreateNotification{
    token:String
    price:String
    type: String
}

type Notification {
  id: String
  targetPrice: Float
  token: String
  active: Boolean
  receiverEmail: String
  CreatedAt: String
  notificationType: String
  DeliveredAt: String
  userId: String
}

type NotificationData {
  token: String!
  targetPrice: [Float!]!
  uptrend: Boolean!
}

type SendNotificationToQueue {
  id: String
  targetPrice: Float
  token: String
  active: Boolean
  receiverEmail: String
  createdAt: String 
  uptrend: Boolean
  notificationType: String
  deliveredAt: String  
  userId: String
}

`;
