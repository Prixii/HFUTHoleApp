declare interface IMutationResponse<T = any> {
  code: number

  msg: string | string[]

  data: T
}

declare interface ISpaceResponse<T = any> {
  code: number
  msg: string
  data: T
}
