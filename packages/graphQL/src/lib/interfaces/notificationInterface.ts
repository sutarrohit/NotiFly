export interface IcreateNotification {
  token: string;
  price: number;
  type: string;
  upTrend: boolean;
}

export interface IsendNotificationToQueue {
  token: string;
  prices: number[];
}

enum NotificationsType {
  Price,
  Time,
}

export interface notifications {
  id: string;
  targetPrice: number;
  token: string;
  active: boolean;
  receiverEmail: string;
  CreatedAt: Date;
  uptrend: boolean;
  notificationType: NotificationsType | null;
  DeliveredAt: Date | null;
  userId: string;
}
