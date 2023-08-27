import { request } from '@/request/spaceRequest'

export function getScoreRequest(refresh = true) {
  return request<IScoreResponse>({
    url: '/score/v3/all',
    params: {
      refresh,
    },
  })
}

export function getSingleScoreRequest(singleScoreDto: SingleScoreDto) {
  return request<ISingleScoreResponse>({
    url: '/score/rank/single',
    params: {
      ...singleScoreDto,
    },
  })
}

export function getSingleScoreSchoolRequest(singleScoreDto: SingleScoreDto) {
  return request<SingScoreRank>({
    url: '/score/rank/single/school',
    params: singleScoreDto,
  })
}

export function getCustomScoreRankRequest(courseNames: string[]) {
  return request<ICustomScoreRankResponse>({
    url: '/score/rank/diy',
    method: 'POST',
    data: {
      courseNames,
    },
  })
}
