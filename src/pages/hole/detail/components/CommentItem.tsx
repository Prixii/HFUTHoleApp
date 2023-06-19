import { FlatList, TouchableNativeFeedback, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useHoleComment } from '@/swr/hole'
import { useHoleDetailCommentContext } from '@/shared/context/hole_detail'
import React, { useState } from 'react'
import { PrimaryText } from '@/components/Text/PrimaryText'
import { RightIcon } from '@/components/icon'
import { useNavigation } from '@react-navigation/native'
import { useHoleDetailId } from '@/shared/hooks/useHoleDetailId'
import { CommentItem } from '@/pages/hole/components/CommentItem'
import {
  DeleteCommentLikeRequest,
  LikeCommentRequest,
} from '@/request/apis/hole'
import { ReplyBody } from '@/components/reply/body'
import { Empty } from '@/components/image/Empty'
import { useBottomCommentContext } from '@/shared/context/hole/comment'

const RenderItemReplyList: React.FC<{ data: IHoleCommentListItem }> = ({
  data,
}) => {
  const theme = useTheme()
  const navigate = useNavigation()
  const holeId = useHoleDetailId()

  // TODO 统一管理
  const navigateToReply = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigate.navigate('reply', {
      commentId: data.id,
      id: holeId,
      comment: data,
    })
  }

  return (
    <View
      className={'rounded-md p-3 grid space-y-2'}
      style={{ backgroundColor: theme.colors.background }}
    >
      {data.replies.map((reply) => (
        <View className={'flex flex-row flex-wrap'} key={reply.id}>
          <PrimaryText children={`${reply.user.username}：`} />
          <ReplyBody data={reply as IHoleReplyListItem} />
        </View>
      ))}
      <TouchableNativeFeedback onPress={navigateToReply}>
        <View className={'w-full py-1 flex flex-row items-center'}>
          <PrimaryText className={'text-xs'}>
            共有{data.repliesCount}条评论
          </PrimaryText>
          <RightIcon size={16} />
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

const RenderItem: React.FC<{
  data: IHoleCommentListResponse
  page: number
}> = ({ data, page }) => {
  const { setIsLiked } = useHoleComment()
  const { openInput } = useBottomCommentContext()

  const handleReply = (data: IHoleCommentListItem) => {
    openInput({
      commentId: data.id,
      ...(data as any),
    })
  }

  return (
    <>
      <FlatList
        data={data.items}
        renderItem={({ item }) => {
          return (
            <CommentItem
              data={item}
              key={item.id}
              onBodyPress={handleReply}
              bottom={
                item.replies.length > 0 && <RenderItemReplyList data={item} />
              }
              reqFunc={
                item.isLiked ? DeleteCommentLikeRequest : LikeCommentRequest
              }
              onLikePress={() => setIsLiked(item, page)}
            />
          )
        }}
      />
    </>
  )
}

const EmptyItem = () => {
  const { isAllMode } = useHoleDetailCommentContext()

  return (
    <View className={'py-2'}>
      <Empty
        text={isAllMode ? 'lz正在期待第一个评论' : 'lz还没填楼噢'}
        size={200}
      />
    </View>
  )
}

export const HoleDetailCommentItem: React.FC<{
  data: IHoleCommentListResponse
  page: number
}> = (props) => {
  const { data } = useHoleComment()

  const isCommentEmpty = data?.pages?.[0]?.items.length > 0

  return (
    <View className={'grid space-y-2'}>
      {isCommentEmpty ? <RenderItem {...props} /> : <EmptyItem />}
    </View>
  )
}
