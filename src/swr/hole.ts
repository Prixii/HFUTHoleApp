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
  SearchHoleRequest,
} from '@/request/apis/hole'
import { useHoleListContext } from '@/shared/context/hole'
import { useParams } from '@/shared/hooks/useParams'
import { useHoleDetailCommentContext } from '@/shared/context/hole_detail'
import { ISearchResultParams } from '@/pages/hole/search/result/result'
import { useRoute } from '@react-navigation/native'

// TODO 重构逻辑
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

  const client = useQueryClient()

  const query = useQuery([SWRKeys.hole.detail, params.id], {
    queryFn: () => GetHoleDetailRequest({ id: params.id }),
  })
  const invalidate = async () => {
    await client.invalidateQueries([SWRKeys.hole.detail, params.id])
  }

  return {
    ...query,
    invalidate,
  }
}

export function useHoleComment() {
  const params = useParams<{ id: number }>()
  const { mode } = useHoleDetailCommentContext()

  const key = [SWRKeys.hole.comments, params.id, mode]

  const query = useInfiniteQuery<IHoleCommentListResponse>(key, {
    queryFn: ({ pageParam = 1 }) => {
      return GetHoleDetailCommentsRequest({
        limit: 10,
        page: pageParam,
        id: params.id,
        mode,
      })
    },
    getNextPageParam: (lastPages) => {
      const nextPage = lastPages.meta.currentPage + 1

      if (nextPage > lastPages.meta.totalPages) {
        return
      }

      return nextPage
    },
    refetchOnMount: true,
  })

  const isDataEmpty = query.data?.pages?.[0]?.items.length > 0

  const client = useQueryClient()

  const invalidateQuery = async (onlyFirstGroup = true) => {
    client.setQueryData<InfiniteData<IHoleListResponse>>(key, (oldData) => {
      if (onlyFirstGroup) {
        // 确保刷新时只更换第一组数据，其他组的数据全都销毁
        oldData.pages = oldData.pages.slice(0, 1)
      }
      return oldData
    })
    await client.invalidateQueries(key, {
      refetchPage: (lastPage, index) => index === 0,
    })
  }

  const invalidAll = async () => {
    await client.invalidateQueries(key)
  }

  return {
    ...query,
    invalidAll,
    invalidateQuery,
    isDataEmpty,
  }
}

export function useHoleSearchResult() {
  const params = useParams<ISearchResultParams>()

  const key = params.keywords

  const query = useInfiniteQuery(key, {
    queryFn: ({ pageParam = 1 }) => {
      return SearchHoleRequest({
        limit: 10,
        page: pageParam,
        keywords: key,
      })
    },
    getNextPageParam: (lastPages) => {
      const nextPage = lastPages.meta.currentPage + 1

      if (nextPage > lastPages.meta.totalPages) {
        return
      }

      return nextPage
    },
    refetchOnMount: true,
  })

  const client = useQueryClient()

  const invalidateQuery = async (onlyFirstGroup = true) => {
    client.setQueryData<InfiniteData<IHoleListResponse>>(key, (oldData) => {
      if (onlyFirstGroup) {
        // 确保刷新时只更换第一组数据，其他组的数据全都销毁
        oldData.pages = oldData.pages.slice(0, 1)
      }
      return oldData
    })
    await client.invalidateQueries(key, {
      refetchPage: (lastPage, index) => index === 0,
    })
  }

  return {
    ...query,
    invalidateQuery,
  }
}
