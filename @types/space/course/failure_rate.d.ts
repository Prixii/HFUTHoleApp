declare type ICourseFailureRateResponse = {
  avgScore: number
  semesterName: string
  failCount: number
  totalCount: number
  failRate: number
}[]

declare interface ICourseFailureRateSearchResponse {
  options: string[]
  failRateVOS: any[]
}
