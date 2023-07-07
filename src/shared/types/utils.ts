export type PlainObject = Record<string, string>

export type ArrayElementType<T> = T extends (infer U)[] ? U : never
