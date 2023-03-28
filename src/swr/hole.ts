import { useInfiniteQuery } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import { GetHoleListRequest } from '@/request/apis/hole'

export function useHoleList() {
  return useInfiniteQuery(
    SWRKeys.hole.list,
    ({ pageParam = 1 }) => GetHoleListRequest({ limit: 8, page: pageParam }),
    {
      getNextPageParam: (lastPages) => {
        const nextPage = lastPages.meta.currentPage + 1

        if (nextPage > lastPages.meta.totalPages) {
          return
        }

        return nextPage
      },
      retry: false,
      keepPreviousData: true,
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  )
}
