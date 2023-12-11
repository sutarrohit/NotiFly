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
type TokenPrices {
 DOGEUSDT: [Float],
  ORDIUSDT:[Float],
  BTCUSDT: [Float],
  BNBUSDT: [Float],
  MATICUSDT:[Float],
  SOLUSDT: [Float],
  MANAUSDT:[Float],
  NEARUSDT:[Float],
  LINKUSDT:[Float],
  SANDUSDT:[Float],
  INJUSDT:[Float],
  ADAUSDT:[Float],
  ATOMUSDT:[Float],
  ARBUSDT:[Float],
  AVAXUSDT:[Float],
  ETHUSDT:[Float],
  DOTUSDT:[Float],
  FLOWUSDT:[Float],
  FTMUSDT:[Float],
  LDOUSDT:[Float],
  RUNEUSDT:[Float],
  SNXUSDT:[Float],
  LTCUSDT:[Float],
  IMXUSDT:[Float],
  LUNAUSDT:[Float],
  UNIUSDT:[Float],
  ALGOUSDT:[Float],
  OPUSDT:[Float],
  STXUSDT:[Float],
  AXSUSDT:[Float],
  MKRUSDT:[Float],
  ETCUSDT:[Float],
  ICPUSDT:[Float],
  APTUSDT:[Float],
  RNDRUSDT:[Float],
  TIAUSDT:[Float],
  XRPUSDT:[Float],
  BCHUSDT:[Float],
  TRXUSDT:[Float],
  XMRUSDT:[Float],
  SHIBUSDT:[Float],
  FILUSDT:[Float],
  FTTUSDT:[Float],
  XLMUSDT:[Float],
  THETAUSDT:[Float],
  GRTUSDT:[Float],
  HBARUSDT:[Float],
  AAVEUSDT:[Float],

}

`;
