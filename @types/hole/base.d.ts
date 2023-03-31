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
}
