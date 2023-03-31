import { Page } from '@/components/Page'
import { StatusBar, View } from 'react-native'
import { useHoleComment, useHoleDetail } from '@/swr/hole'
import { HoleDetailComment } from '@/pages/hole/detail/Comment'
import { BaseAppBar } from '@/components/BaseAppBar'
import { UserAvatar } from '@/components/UserAvatar'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { IdText } from '@/components/Text/Id'
import { TimeText } from '@/components/Text/Time'
import { LoadMore } from '@/components/LoadMore'
import { HoleItem } from '@/pages/hole/items'
import { SkeletonLoading } from '@/components/Skeleton'
import { Text } from 'react-native-paper'

export function HoleDetail() {
  const { data, isSuccess, refetch } = useHoleDetail()

  const {
    isSuccess: isCommentSuccess,
    data: commentData,
    fetchNextPage,
    hasNextPage,
    invalidateQuery,
  } = useHoleComment()

  const onRefresh = async () => {
    await fetchNextPage()
  }

  const onTopRefresh = async () => {
    await Promise.all([await refetch(), await invalidateQuery()])
  }

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <Page className={'px-0'}>
        <BaseAppBar>
          {isSuccess && (
            <View className={'flex flex-row space-x-2'}>
              <UserAvatar url={data.user.avatar} />
              <View className={'grid space-y-2 w-3/4'}>
                <IdText id={data.id} />
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {data.body}
                </Text>
              </View>
            </View>
          )}
        </BaseAppBar>
        <View className={'mt-20 bg-white'}>
          {!isSuccess && <SkeletonLoading nums={1} />}
          {isCommentSuccess && isSuccess && (
            <RefreshingFlatList
              onRefreshing={onRefresh}
              onTopRefresh={onTopRefresh}
              ListHeaderComponent={() => (
                <View className={'bg-white'}>
                  <HoleItem data={data} />
                  <View className={'px-3 py-3'}>
                    <Text variant={'titleLarge'}>
                      {commentData.pages[0]?.meta?.totalItems || 0} 条评论
                    </Text>
                  </View>
                </View>
              )}
              ListFooterComponent={() => (
                <LoadMore text={'没有更多评论了哦'} hasNextPage={hasNextPage} />
              )}
              data={commentData.pages}
              renderItem={({ item: group, index }) => (
                <View className={'grid space-y-2 px-2'} key={index}>
                  {group.items.map((item) => (
                    <View
                      className={
                        'flex flex-row space-x-2 rounded-lg p-3 border-b-[1px] border-black/5'
                      }
                    >
                      <UserAvatar url={item.user.avatar} size={30} />
                      <View className={'w-full grid gap-2'}>
                        <View>
                          <Text className={'text-black/60'}>
                            {item.user.username}
                          </Text>
                          <TimeText time={item.createAt} />
                        </View>
                        <Text>{item.body}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            />
          )}
        </View>
        <HoleDetailComment />
      </Page>
    </>
  )
}
