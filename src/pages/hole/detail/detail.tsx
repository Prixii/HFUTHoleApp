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
import { SkeletonLoading } from '@/components/Skeleton'
import { Text } from 'react-native-paper'
import { HoleInfo } from '@/pages/hole/components/HoleInfo'
import React, { useState } from 'react'
import { IconButton } from '@/components/IconButton'
import { UserText } from '@/components/Text/User'
import { LikeIcon } from '@/components/icon'
import { useMutation } from 'react-query'
import { DeleteLikeHoleRequest, PostLikeHoleRequest } from '@/request/apis/hole'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { HoleDetailCommentHeader } from '@/pages/hole/detail/CommentHeader'

const Like = () => {
  const { invalidate, data } = useHoleDetail()

  const mutation = useMutation(
    ['like', data],
    (id: number) => {
      const reqFunc = data.isLiked ? DeleteLikeHoleRequest : PostLikeHoleRequest

      return reqFunc({ id })
    },
    {
      async onSuccess() {
        await invalidate()
      },
    }
  )

  const likeHole = useDebounce(async () => {
    mutation.mutate(data.id)
  })

  return (
    <View className={'flex justify-center items-center'}>
      <IconButton
        icon={() => (
          <LikeIcon {...(data.isLiked ? {} : { color: 'gray' })} size={20} />
        )}
        transparent={true}
        onPress={likeHole}
      />
      <Text className={'text-xs text-black/50'}>{data.favoriteCounts}</Text>
    </View>
  )
}

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
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Page className={'w-screen'}>
        <BaseAppBar>
          {isSuccess && (
            <>
              <View className={'flex flex-row flex-1'}>
                <View className={'flex flex-row space-x-2'}>
                  <UserAvatar url={data.user.avatar} />
                  <View className={'grid space-y-2 w-2/3'}>
                    <View className={'flex flex-row space-x-2 items-center'}>
                      <IdText id={data.id} />
                      <View>
                        <TimeText time={data.createAt} />
                      </View>
                    </View>
                    <Text
                      ellipsizeMode={'tail'}
                      numberOfLines={1}
                      className={'text-black/60'}
                    >
                      {data.body}
                    </Text>
                  </View>
                </View>
              </View>
              <Like />
            </>
          )}
        </BaseAppBar>
        <View className={'mt-20'}>
          {!isSuccess && <SkeletonLoading nums={1} />}
          {isCommentSuccess && isSuccess && (
            <RefreshingFlatList
              onRefreshing={onRefresh}
              onTopRefresh={onTopRefresh}
              ListHeaderComponent={() => (
                <>
                  <View className={'mb-2'}>
                    <HoleInfo
                      data={data}
                      bottom={<Like />}
                      className={'rounded-none'}
                    />
                  </View>
                  <HoleDetailCommentHeader />
                </>
              )}
              ListFooterComponent={() => (
                <LoadMore text={'没有更多评论了哦'} hasNextPage={hasNextPage} />
              )}
              data={commentData.pages}
              renderItem={({ item: group, index }) => (
                <View className={'grid space-y-2 px-3 bg-white'} key={index}>
                  {group.items.map((item) => (
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
