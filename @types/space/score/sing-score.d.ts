declare interface SingleScoreDto {
  semesterId: number
  lessonId: string
}

declare interface ISingleScoreResponse {
  majorRank: SingScoreRank
  classRank: SingScoreRank
}

interface SingScoreRank {
  total: number
  score: Score
  gpa: Gpa
  details: SingleScoreDetail[]
}

interface Score {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
  actualNum: number
}

interface Gpa {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
  actualNum: number
}

interface SingleScoreDetail {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
  actualNum: number
  name: string
}
