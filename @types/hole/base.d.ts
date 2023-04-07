declare interface IHole {
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
  isLiked: boolean

  comments: Comment[]
}

interface Comment {
  id: string
  createAt: string
  body: string
  favoriteCount: number

  user: User
}

interface User {
  id: number
  createAt: string
  username: string
  avatar: string
}
