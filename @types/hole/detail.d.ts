declare interface IHoleDetailResponse extends IHole {
  id: number
  createAt: string
  body: string
  imgs: string[]
  favoriteCounts: number
  user: User
  votes: any[]
  tags: Tag[]
  voteTotalCount: number
}

interface User {
  id: number
  createAt: string
  username: string
  avatar: string
}

interface Tag {
  id: string
  createAt: string
  body: string
}
