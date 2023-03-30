import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from 'react-query'
import { SWRKeys } from '@/swr/utils'
import {
  GetHoleDetailCommentsRequest,
  GetHoleDetailRequest,
  GetHoleListRequest,
} from '@/request/apis/hole'
import { useHoleListContext } from '@/shared/context/hole'
import { useParams } from '@/shared/hooks/useParams'

export function useHoleList() {
  const { mode } = useHoleListContext()

  const query = useInfiniteQuery(
    [SWRKeys.hole.list, mode],
    ({ pageParam = 1 }) =>
      GetHoleListRequest({
        limit: 10,
        page: pageParam,
        mode,
      }),
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
      [SWRKeys.hole.list, mode],
      (oldData) => {
        // 确保刷新时只更换第一组数据，其他组的数据全都销毁
        oldData.pages = oldData.pages.slice(0, 1)
        return oldData
      }
    )
    await client.invalidateQueries([SWRKeys.hole.list, mode], {
      refetchPage: (lastPage, index) => index === 0,
    })
  }

  return {
    ...query,
    client,
    invalidateQuery,
  }
}

export function useHoleDetail() {
  const params = useParams<{ id: number }>()

  const query = useQuery([SWRKeys.hole.detail, params.id], {
    queryFn: () => GetHoleDetailRequest({ id: params.id }),
  })

  return {
    ...query,
  }
}

export function useHoleComment() {
  const params = useParams<{ id: number }>()

  const query = useInfiniteQuery([SWRKeys.hole.comments, params.id], {
    queryFn: ({ pageParam = 1 }) =>
      GetHoleDetailCommentsRequest({
        limit: 10,
        page: pageParam,
        id: params.id,
      }),
    getNextPageParam: (lastPages) => {
      const nextPage = lastPages.meta.currentPage + 1

      if (nextPage > lastPages.meta.totalPages) {
        return
      }

      return nextPage
    },
  })

  return {
    ...query,
  }
}
