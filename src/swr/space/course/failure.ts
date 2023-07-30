import { SWRKeys } from '@/swr/utils'
import { useBaseQuery } from '@/swr/useBaseQuery'
import { getCourseFailureRateRequest } from '@/request/space/course'
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
