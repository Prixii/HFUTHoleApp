declare interface IHoleGetCategoryListResponse {
  items: Item[]
  meta: Meta
}

interface Item {
  id: string
  createAt: string
  name: string
  description: string
  bgUrl: string
  holes: Hole[]
}

interface Hole {
  id: number
  createAt: string
  body: string
  title: string
  imgs: any[]
  bilibili?: string
  favoriteCounts: number
  tags: any[]
  vote: any
}

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}
