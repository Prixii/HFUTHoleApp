declare interface IHole {
  id: number
  createAt: string
  body: string
  imgs: string[]
  favoriteCounts: number
  user: User
  vote: Vote
  tags: Tag[]
  voteTotalCount: number
  isLiked: boolean
  comments: Comment[]
  commentCounts: number
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
