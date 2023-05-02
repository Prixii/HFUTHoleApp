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
  type: string
  endTime: string
  items: VoteItem[]
  isVoted: boolean | number
  totalCount: number
  isExpired: boolean
}

interface VoteItem {
  id: string
  createAt: string
  option: string
  count: number
  isVoted: number | boolean
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
