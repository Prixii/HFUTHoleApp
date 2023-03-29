import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import { GetHoleListRequest } from '@/request/apis/hole'

export function useHoleList() {
  const query = useInfiniteQuery(
    SWRKeys.hole.list,
    async ({ pageParam = 1 }) => {
      const data = await GetHoleListRequest({ limit: 10, page: pageParam })
      return data
    },
    {
      getNextPageParam: (lastPages) => {
        const nextPage = lastPages.meta.currentPage + 1

        if (nextPage > lastPages.meta.totalPages) {
          return
        }

        return nextPage
      },
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  )

  const client = useQueryClient()

  const invalidateQuery = async () => {
    client.setQueryData<InfiniteData<IHoleListResponse>>(
      SWRKeys.hole.list,
      (oldData) => {
        // 确保刷新时只更换第一组数据，其他组的数据全都销毁
        oldData.pages = oldData.pages.slice(0, 1)
        return oldData
      }
    )
    await client.invalidateQueries(SWRKeys.hole.list, {
      refetchPage: (lastPage, index) => index === 0,
    })
  }

  return {
    ...query,
    client,
    invalidateQuery,
  }
}
