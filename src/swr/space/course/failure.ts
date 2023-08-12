import { SWRKeys } from '@/swr/utils'
import { useBaseQuery } from '@/swr/useBaseQuery'
import {
  getCourseFailureRateRequest,
  getCourseFailureRateSearchRequest,
} from '@/request/space/course'
import { useParams } from '@/shared/hooks/useParams'

export function useSpaceCourseFailureQuery() {
  const { courseName } = useParams<{ courseName: string }>()

  const queryKey = [SWRKeys.space.course.failureRateQuery, courseName]
  const query = useBaseQuery({
    queryKey,
    queryFn: () => getCourseFailureRateRequest(courseName),
  })

  return {
    ...query,
    courseName,
  }
}

export function useSpaceCourseFailureSearchQuery(keyword: string) {
  const queryKey = [SWRKeys.space.course.failureRateSearchQuery, keyword]
  const query = useBaseQuery({
    queryKey,
    queryFn: () => getCourseFailureRateSearchRequest(keyword),
    enabled: !!keyword,
    retry: false,
  })

  return query
}
