declare interface ICardBaseInfoResponse {
  data: ICardBaseInfo
}

interface ICardBaseInfo {
  balance: string
  cardStatus: boolean
  freeze: boolean
  loss: boolean
}
