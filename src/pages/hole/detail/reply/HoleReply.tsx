import { useHoleReplyList } from '@/swr/hole/reply'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { View } from 'react-native'
import { CommentItem } from '@/pages/hole/components/CommentItem'
import {
  DeleteCommentLikeRequest,
  DeleteReplyLikeRequest,
  LikeCommentRequest,
  LikeReplyRequest,
} from '@/request/apis/hole'
import { Separator } from '@/components/Separator'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { LoadMore } from '@/components/LoadMore'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useBottomCommentContext } from '@/shared/context/hole/comment'
import { CommentBottomInput } from '@/pages/hole/detail/components/CommentBottomInput'
import { BilibiliPlayer } from '@/components/player/BilibiliPlayer'

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
    isLoading,
  } = useHoleReplyList()
  const comment = data?.pages?.[0]?.comment

  const { openInput } = useBottomCommentContext()

  const onLikePress = () => {
    invalidAll()
  }

  return (
    <LoadingScreen isLoading={isLoading}>
      <View className={'bg-white h-full'}>
        <RefreshingFlatList
          data={data?.pages}
          refreshing={isLoading}
          hasNextPage={hasNextPage}
          ListHeaderComponent={
            <>
              <View className={'px-3'}>
                <CommentItem
                  data={comment!}
                  reqFunc={
                    comment?.isLiked
                      ? DeleteCommentLikeRequest
                      : LikeCommentRequest
                  }
                  onLikePress={onLikePress}
                  isReply={true}
                />
              </View>
              <Separator />
              <View className={'p-3'}>
                <SecondaryText>
                  共有{data?.pages?.[0]?.meta.totalItems}条回复
                </SecondaryText>
              </View>
            </>
          }
          ListFooterComponent={() => (
            <LoadMore
              text={isDataEmpty ? '没有更多回复了哦' : ''}
              hasNextPage={hasNextPage!}
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
                    openInput({
                      commentId: comment?.id,
                      replyId: data.id,
                      body: data.body,
                      user: data.user,
                    })
                  }}
                />
              ))}
            </View>
          )}
        />
        <CommentBottomInput
          data={{
            commentId: comment?.id,
            user: comment?.user,
          }}
        />
      </View>
    </LoadingScreen>
  )
}
