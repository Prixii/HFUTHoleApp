import { useParams } from '@/shared/hooks/useParams'
import { useBaseQuery } from '@/swr/useBaseQuery'
import { SWRKeys } from '@/swr/utils'
import { getCourseClassmatesRequest } from '@/request/space/course'

export function useSpaceClassmateQuery() {
  const params = useParams<{ id: string }>()

  const queryKey = [SWRKeys.space.course, params.id]
  const query = useBaseQuery({
    queryKey,
    queryFn: () => {
      return getCourseClassmatesRequest(params.id)
    },
  })

  return {
    ...query,
  }
}
