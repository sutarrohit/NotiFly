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
