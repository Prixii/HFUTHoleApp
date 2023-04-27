import { useParams } from '@/shared/hooks/useParams'
import { useHoleReplyList } from '@/swr/hole/reply'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { Text, View } from 'react-native'
import { CommentItem } from '@/pages/hole/components/CommentItem'
import {
  DeleteReplyLikeRequest,
  LikeReplyRequest,
  PostHoleCommentReplyRequest,
} from '@/request/apis/hole'
import { Separator } from '@/components/Separator'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { useState } from 'react'
import { BottomSheetReply } from '@/components/reply/reply'
import { ReplyForm } from '@/components/reply/Form'
import { LoadMore } from '@/components/LoadMore'

export function HoleReply() {
  const {
    data,
    invalidAll,
    hasNextPage,
    onRefresh,
    onTopRefresh,
    isDataEmpty,
  } = useHoleReplyList()
  const comment = useParams<{ comment: IHoleCommentListItem }>().comment

  const [open, setOpen] = useState(false)
  const [replyData, setReplyData] = useState<IHoleCommentListItem>()

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <View className={'bg-white h-full'}>
      <RefreshingFlatList
        data={data?.pages}
        ListHeaderComponent={
          <>
            <View className={'px-3'}>
              <CommentItem data={comment} reqFunc={async () => {}} />
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
                onLikePress={() => invalidAll()}
                onBodyPress={(data) => {
                  setReplyData(data as any)
                  setOpen(true)
                }}
              />
            ))}
          </View>
        )}
      />
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
          invalidAll={invalidAll}
        />
      </BottomSheetReply>
    </View>
  )
}
