import { useHoleComment, useHoleDetail } from '@/swr/hole'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { HoleInfo } from '@/pages/hole/components/HoleInfo'
import { LikeHole } from '@/pages/hole/detail/LikeHole'
import { Separator } from '@/components/Separator'
import { HoleDetailCommentHeader } from '@/pages/hole/detail/components/CommentHeader'
import { LoadMore } from '@/components/LoadMore'
import { HoleDetailCommentItem } from '@/pages/hole/detail/components/CommentItem'

export function HoleDetailCommentList() {
  const {
    isSuccess: isCommentSuccess,
    data: commentData,
    fetchNextPage,
    hasNextPage,
    invalidateQuery,
    isDataEmpty,
  } = useHoleComment()

  const { data, isSuccess, refetch } = useHoleDetail()

  const onRefresh = async () => {
    await fetchNextPage()
  }

  const onTopRefresh = async () => {
    await Promise.all([await refetch(), await invalidateQuery()])
  }

  return (
    isCommentSuccess &&
    isSuccess && (
      <RefreshingFlatList
        onRefreshing={onRefresh}
        onTopRefresh={onTopRefresh}
        ListHeaderComponent={() => (
          <>
            <HoleInfo data={data} bottom={<LikeHole />} showComment={false} />
            <Separator />
            <HoleDetailCommentHeader />
          </>
        )}
        ListFooterComponent={() => (
          <LoadMore
            text={isDataEmpty ? '没有更多评论了哦' : ''}
            hasNextPage={hasNextPage}
          />
        )}
        data={commentData.pages}
        renderItem={(itemProps) => (
          <HoleDetailCommentItem {...itemProps} key={itemProps.index} />
        )}
      />
    )
  )
}
