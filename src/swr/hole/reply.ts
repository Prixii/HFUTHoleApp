import { useParams } from '@/shared/hooks/useParams'
import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query'
import { GetHoleReplyRequest, SearchHoleRequest } from '@/request/apis/hole'
import { SWRKeys } from '@/swr/utils'
import { Updater } from 'react-query/types/core/utils'

export const useHoleReplyList = () => {
  const params = useParams<{ commentId: string }>()

  const id = params.commentId
  const key = [SWRKeys.hole.getCommentReply, id]

  const query = useInfiniteQuery(key, {
    queryFn: ({ pageParam = 1 }) => {
      return GetHoleReplyRequest({
        limit: 10,
        page: pageParam,
        id,
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

  const onRefresh = async () => {
    await query.fetchNextPage()
  }

  const onTopRefresh = async () => {
    await Promise.all([await query.refetch()])
  }

  const setData = async <T = InfiniteData<IHoleReplyListResponse>>(
    updater: Updater<T | undefined, T>
  ) => {
    await client.setQueryData<InfiniteData<IHoleCommentListResponse>>(
      key,
      updater as any
    )
  }

  const setIsLiked = async (data: IHoleReplyListItem, pageIndex = 0) => {
    await setData((oldData) => {
      const pageTarget = oldData?.pages?.[pageIndex]

      if (pageTarget) {
        const targetIndex = pageTarget.items.findIndex(
          (item) => item.id === data.id
        )

        if (targetIndex !== -1) {
          const target = pageTarget.items[targetIndex]

          target.isLiked = !target.isLiked

          if (target.isLiked) {
            target.favoriteCounts++
          } else {
            target.favoriteCounts--
          }
        }
      }

      return oldData
    })
  }

  return {
    ...query,
    invalidateQuery,
    invalidAll,
    onRefresh,
    onTopRefresh,
    isDataEmpty,
    setIsLiked,
  }
}
