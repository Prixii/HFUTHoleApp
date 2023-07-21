import { request } from '@/request/spaceRequest'

export interface CourseListRequestDto {
  refresh?: boolean
  semesterId?: number
}

export function getCourseListRequest({
  refresh = true,
  semesterId,
}: CourseListRequestDto) {
  return request<ICourseResponse>({
    url: 'course/all',
    params: {
      refresh,
      semesterId,
    },
  })
}
