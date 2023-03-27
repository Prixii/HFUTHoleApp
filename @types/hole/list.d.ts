declare interface IHoleListResponse {
  items: Item[]
  meta: Meta
}

interface Item {
  id: number
  createAt: string
  body: string
  imgs: string[]
  favoriteCounts: number
  user: User
  votes: Vote[]
  tags: Tag[]
  voteTotalCount: number
  commentsCount: number
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
