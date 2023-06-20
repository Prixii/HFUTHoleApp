import { useHoleComment, useHoleDetail } from '@/swr/hole'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { HoleInfo, HoleInfoBody } from '@/pages/hole/components/HoleInfo'
import { LikeHole } from '@/pages/hole/detail/LikeHole'
import { Separator } from '@/components/Separator'
import { HoleDetailCommentHeader } from '@/pages/hole/detail/components/CommentHeader'
import { LoadMore } from '@/components/LoadMore'
import { HoleDetailCommentItem } from '@/pages/hole/detail/components/CommentItem'
import { BilibiliPlayer } from '@/components/player/BilibiliPlayer'
import React from 'react'
import { View } from 'react-native'

export function HoleDetailCommentList() {
  const {
    isSuccess: isCommentSuccess,
    data: commentData,
    fetchNextPage,
    hasNextPage,
    invalidateQuery,
    isDataEmpty,
    isFetching,
  } = useHoleComment()

  const { data, isSuccess, refetch } = useHoleDetail()

  const isAllSuccess = isCommentSuccess && isSuccess

  const onRefresh = async () => {
    await fetchNextPage()
  }

  const onTopRefresh = async () => {
    await Promise.all([await refetch(), await invalidateQuery()])
  }

  const BodyRender = (
    <View>
      <BilibiliPlayer bvid={'BV1vi4y1K7o'} />
      <HoleInfoBody data={data} />
    </View>
  )

  return isAllSuccess ? (
    <RefreshingFlatList
      onRefreshing={onRefresh}
      hasNextPage={hasNextPage}
      onTopRefresh={onTopRefresh}
      refreshing={isFetching}
      ListHeaderComponent={() => (
        <>
          <HoleInfo
            data={data}
            bottom={<LikeHole />}
            body={BodyRender}
            showComment={false}
          />
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
        <HoleDetailCommentItem data={itemProps.item} page={itemProps.index} />
      )}
    />
  ) : (
    <></>
  )
}
