import { request } from '@/request/spaceRequest'

export function getCourseListRequest(refresh = false, semesterId?: number) {
  return request<ICourseResponse>({
    url: 'course/all',
    params: {
      refresh,
      semesterId,
    },
  })
}
