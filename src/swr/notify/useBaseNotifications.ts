import { useQuery } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import { getBaseNotificationsRequest } from '@/request/apis/notify'
import { useMemo } from 'react'
import { useBaseQuery } from '@/swr/useBaseQuery'

export function useBaseNotificationsQuery() {
  const query = useBaseQuery<IGetBaseNotificationsResponse>({
    queryKey: SWRKeys.notify.base,
    queryFn: getBaseNotificationsRequest,
  })

  const totalCount = useMemo(() => {
    if (!query.data) {
      return 0
    }

    return query.data.system.totalCount + query.data.interaction.totalCount
  }, [query.data])

  return {
    ...query,
    totalCount,
  }
}
