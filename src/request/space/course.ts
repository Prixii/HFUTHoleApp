import { request } from '@/request/spaceRequest'

export interface CourseListRequestDto {
  refresh?: boolean
  semesterId?: number | string
}

export function getCourseListRequest({
  refresh = true,
  semesterId,
}: CourseListRequestDto) {
  return request<ICourseResponse>({
    url: '/course/all',
    params: {
      refresh,
      semesterId,
    },
  })
}

export function getCourseClassmatesRequest(courseId: string) {
  return request({
    url: '/classmate/all',
  })
}

export function getCourseFailureRateRequest(courseName: string) {
  return request<ICourseFailureRateResponse>({
    url: '/score/failRate',
    params: {
      courseName,
    },
  })
}

export function getCourseFailureRateSearchRequest(courseName: string) {
  return request<ICourseFailureRateSearchResponse>({
    url: '/score/v2/failRate',
    params: {
      courseName,
    },
  })
}
