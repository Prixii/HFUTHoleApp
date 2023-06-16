import { request } from '@/request/spaceRequest'

export function getCourseListRequest(refresh = false, semesterId?: number) {
  return request<ISpaceResponse<ICourse>>({
    url: 'course/all',
    params: {
      refresh,
      semesterId,
    },
  })
}
