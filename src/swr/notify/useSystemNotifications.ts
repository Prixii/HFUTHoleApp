import { getSystemNotificationsRequest } from '@/request/apis/notify'
import { useBaseInfiniteQuery } from '@/swr/useBaseInfiniteQuery'

export function useSystemNotificationsQuery() {
  const query = useBaseInfiniteQuery<INotifySystemListResponse>({
    queryKey: '1',
    queryFn: ({ pageParam = 1 }) =>
      getSystemNotificationsRequest({
        limit: 10,
        page: pageParam,
      }),
    staleTime: 0,
  })

  return {
    ...query,
  }
}
