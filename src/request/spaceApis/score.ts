import { request } from '@/request/spaceRequest'

export function getScoreRequest(refresh = true) {
  return request<IScoreResponse>({
    url: '/score/v3/all',
    params: {
      refresh,
    },
  })
}
