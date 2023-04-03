export type InferArrayItem<T extends any[]> = T extends (infer R)[] ? R : never

export interface IPagination {
  limit: number

  page: number
}

export type AwaitAble<T = any> = Promise<T> | T

export type Func<T = any> = (...args: any[]) => AwaitAble<T>

export type AwaitFunc<Args = any, R = any> = (...args: Args[]) => Promise<R>

export interface IClassName {
  className?: string
}
