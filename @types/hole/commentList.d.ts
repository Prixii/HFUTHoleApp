declare interface IHoleCommentListResponse {
  items: Item[]
  meta: Meta
}

interface Item {
  id: string
  createAt: string
  body: string
  favoriteCount: number
  user: User
  replies: any[]
}

interface User {
  id: number
  createAt: string
  username: string
  avatar: string
}

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
