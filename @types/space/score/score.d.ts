declare interface IScoreResponse {
  compulsoryRank: CompulsoryRank
  calculateLogs: CalculateLog[]
  totalRank: TotalRank
  semesters: Semester[]
}

interface CompulsoryRank {
  score: Rank
  gpa: Rank
  total: number
}

interface Rank {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
  actualNum: number
}

interface CalculateLog {
  semesterName: string
  scoreDetails: string[]
}

interface TotalRank {
  score: Rank
  gpa: Rank
  total: number
}

interface Semester {
  semester: string
  semesterId: number
  compulsoryRank: CompulsoryRank
  totalRank: TotalRank
  scores: SemesterScore[]
}

interface SemesterScore {
  name: string
  lessonId: string
  teachingClassId: string
  credit: string
  gpa: string
  score: string
  details: Detail[]
}

interface Detail {
  type: string
  score: string
}
