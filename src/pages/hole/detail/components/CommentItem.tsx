import { FlatList, TouchableNativeFeedback, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { Empty } from '@/components/svg/Empty'
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
import { HoleCommentReply } from '@/pages/hole/detail/components/CommentReply'
import { ReplyBody } from '@/components/reply/body'

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
        <View className={'flex flex-row'} key={reply.id}>
          <Text className={'text-sm flex-1'}>
            <PrimaryText children={`${reply.user.username}：`} />
            <ReplyBody data={reply as IHoleReplyListItem} />
          </Text>
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
  const [replyOpen, setReplyOpen] = useState(false)
  const [replyData, setReplyData] = useState<IHoleCommentListItem>(null)

  const { setIsLiked } = useHoleComment()

  const handleReply = (data: IHoleCommentListItem) => {
    setReplyOpen(true)
    setReplyData(data)
  }

  return (
    <View className={'px-3'}>
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
      <HoleCommentReply
        data={replyData}
        open={replyOpen}
        setOpen={setReplyOpen}
        page={page}
      />
    </View>
  )
}

const EmptyItem = () => {
  const { isAllMode } = useHoleDetailCommentContext()

  return (
    <View className={'py-2'}>
      <Empty
        text={
          isAllMode ? '树洞空空的，洞主正在期待第一个评论' : '洞主还没填楼噢'
        }
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
