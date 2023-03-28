declare interface IMutationResponse<T = any> {
  code: number

  msg: string

  data: T
}
