import { useParams } from '@/shared/hooks/useParams'
import { useHoleReplyList } from '@/swr/hole/reply'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { Text, View } from 'react-native'
import { CommentItem } from '@/pages/hole/components/CommentItem'
import {
  DeleteCommentLikeRequest,
  DeleteReplyLikeRequest,
  LikeCommentRequest,
  LikeReplyRequest,
  PostHoleCommentReplyRequest,
} from '@/request/apis/hole'
import { Separator } from '@/components/Separator'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { useState } from 'react'
import { BottomSheetReply } from '@/components/reply/reply'
import { ReplyForm } from '@/components/reply/Form'
import { LoadMore } from '@/components/LoadMore'

// TODO 重写回复区，尤其是展示特定的评论
export function HoleReply() {
  const {
    data,
    invalidAll,
    hasNextPage,
    onRefresh,
    onTopRefresh,
    isDataEmpty,
    setIsLiked,
    isSuccess,
    isLoading,
  } = useHoleReplyList()
  const comment = data?.pages?.[0]?.comment

  const [open, setOpen] = useState(false)
  const [replyData, setReplyData] = useState<IHoleCommentListItem>()

  const closeModal = () => {
    setOpen(false)
  }

  const onLikePress = () => {
    invalidAll()
  }

  return (
    <View className={'bg-white h-full'}>
      {isSuccess && (
        <RefreshingFlatList
          data={data?.pages}
          refreshing={isLoading}
          hasNextPage={hasNextPage}
          ListHeaderComponent={
            <>
              <View className={'px-3'}>
                <CommentItem
                  data={comment}
                  reqFunc={
                    comment?.isLiked
                      ? DeleteCommentLikeRequest
                      : LikeCommentRequest
                  }
                  onLikePress={onLikePress}
                />
              </View>
              <Separator />
              <View className={'p-3'}>
                <SecondaryText>共有{comment.repliesCount}条评论</SecondaryText>
              </View>
            </>
          }
          ListFooterComponent={() => (
            <LoadMore
              text={isDataEmpty ? '没有更多回复了哦' : ''}
              hasNextPage={hasNextPage}
            />
          )}
          onRefreshing={onRefresh}
          onTopRefresh={onTopRefresh}
          renderItem={({ item: group, index }) => (
            <View className={'px-3'}>
              {group.items.map((item) => (
                <CommentItem
                  data={item}
                  key={item.id}
                  selectable={true}
                  reqFunc={
                    item.isLiked ? DeleteReplyLikeRequest : LikeReplyRequest
                  }
                  onLikePress={() => setIsLiked(item, index)}
                  onBodyPress={(data) => {
                    setReplyData(data as any)
                    setOpen(true)
                  }}
                />
              ))}
            </View>
          )}
        />
      )}
      <BottomSheetReply open={open} setOpen={setOpen} data={replyData}>
        <ReplyForm
          data={replyData}
          closeModal={closeModal}
          reqFunc={(body) =>
            PostHoleCommentReplyRequest({
              body,
              replyId: replyData.id,
              commentId: comment.id,
            })
          }
        />
      </BottomSheetReply>
    </View>
  )
}
