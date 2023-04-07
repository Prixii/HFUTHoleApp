import { CommentForm } from '@/pages/hole/detail/CommentForm'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { View } from 'react-native'
import { HoleInfo } from '@/pages/hole/components/HoleInfo'
import { HoleDetailCommentHeader } from '@/pages/hole/detail/CommentHeader'
import { LoadMore } from '@/components/LoadMore'
import { UserAvatar } from '@/components/UserAvatar'
import { UserText } from '@/components/Text/User'
import { TimeText } from '@/components/Text/Time'
import { Text } from 'react-native-paper'
import { useHoleComment, useHoleDetail } from '@/swr/hole'
import { LikeHole } from '@/pages/hole/detail/LikeHole'
import { Empty } from '@/components/svg/Empty'
import { Separator } from '@/components/Separator'
import { useHoleDetailCommentContext } from '@/shared/context/hole_detail'

export function HoleDetailComment() {
  const {
    isSuccess: isCommentSuccess,
    data: commentData,
    fetchNextPage,
    hasNextPage,
    invalidateQuery,
  } = useHoleComment()

  const { data, isSuccess, refetch } = useHoleDetail()

  const { isAllMode } = useHoleDetailCommentContext()

  const isCommentEmpty = commentData?.pages?.[0]?.items.length > 0

  const onRefresh = async () => {
    await fetchNextPage()
  }

  const onTopRefresh = async () => {
    await Promise.all([await refetch(), await invalidateQuery()])
  }

  return (
    <View className={'h-full'}>
      {isCommentSuccess && isSuccess && (
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
              text={isCommentEmpty ? '没有更多评论了哦' : ''}
              hasNextPage={hasNextPage}
            />
          )}
          data={commentData.pages}
          renderItem={({ item: group, index }) => (
            <View className={'grid space-y-2'} key={index}>
              {isCommentEmpty ? (
                group.items.map((item) => (
                  <View
                    className={
                      'flex flex-row space-x-2 rounded-lg p-3 border-b-[1px] border-black/5'
                    }
                  >
                    <UserAvatar url={item.user.avatar} size={30} />
                    <View className={'w-full grid gap-2'}>
                      <View>
                        <UserText username={item.user.username} />
                        <TimeText time={item.createAt} />
                      </View>
                      <Text>{item.body}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <View>
                  <Empty
                    text={
                      isAllMode
                        ? '树洞空空的，洞主正在期待第一个评论'
                        : '洞主还没填楼噢'
                    }
                  />
                </View>
              )}
            </View>
          )}
        />
      )}
      <CommentForm />
    </View>
  )
}
