export type PlainObject = Record<string, string>

export type ArrayElementType<T> = T extends (infer U)[] ? U : never

export interface ListResponseAble {
  items: any[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}
