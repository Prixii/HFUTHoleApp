declare interface IMutationResponse<T = any> {
  code: number

  msg: string | string[]

  data: T
}
