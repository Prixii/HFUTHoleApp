import { ArticleCategoryEnum, HoleListMode } from '@/shared/enums'
import { SWRKeys } from '@/swr/utils'
import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import { GetHoleListRequest } from '@/request/apis/hole'
import { Updater } from 'react-query/types/core/utils'
import { useParams } from '@/shared/hooks/useParams'
import { useMemo } from 'react'
import { useRoute } from '@react-navigation/native'

export function useHoleCategoryList() {
  const params = useParams<{ category: ArticleCategoryEnum }>()
  const route = useRoute()

  const mode = useMemo(() => {
    if (route.name === 'latest') {
      return HoleListMode.latest
    } else if (route.name === 'hot') {
      return HoleListMode.hot
    }
  }, [route])

  const key = [SWRKeys.hole.list, params?.category, mode]

  const query = useInfiniteQuery(
    key,
    ({ pageParam = 1 }) =>
      GetHoleListRequest({
        limit: 20,
        page: pageParam,
        mode,
        category: params.category,
      }),
    {
      getNextPageParam: (lastPages) => {
        const nextPage = lastPages.meta.currentPage + 1

        if (
          nextPage > lastPages.meta.totalPages ||
          lastPages.items.length === 0
        ) {
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
    client.setQueryData<InfiniteData<IHoleListResponse>>(key, (oldData) => {
      // 确保刷新时只更换第一组数据，其他组的数据全都销毁
      oldData.pages = oldData.pages.slice(0, 1)
      return oldData
    })
    await client.invalidateQueries(key, {
      refetchPage: (lastPage, index) => index === 0,
    })
  }

  const setData = async <T = InfiniteData<IHoleListResponse>>(
    updater: Updater<T | undefined, T>
  ) => {
    await client.setQueryData<InfiniteData<IHoleListResponse>>(
      key,
      updater as any
    )
  }

  return {
    ...query,
    client,
    invalidateQuery,
    setData,
  }
}
