export type InferArrayItem<T extends any[]> = T extends (infer R)[] ? R : never

export interface IPagination {
  limit: number

  page: number
}

export type AwaitAble<T = any> = Promise<T> | T

export type Func<T = any> = (...args: any[]) => AwaitAble<T>

export interface IClassName {
  className?: string
}
