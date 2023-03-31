declare interface IHoleListResponse {
  items: IHole[]
  meta: Meta
}

interface User {
  id: number
  createAt: string
  username: string
  avatar: string
}

interface Vote {
  id: string
  createAt: string
  option: string
  count: number
  type: string
}

interface Tag {
  id: string
  createAt: string
  body: string
}

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
