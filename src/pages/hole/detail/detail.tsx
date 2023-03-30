import { Page } from '@/components/Page'
import { StatusBar, View } from 'react-native'
import { BaseAppBar } from '@/components/BaseAppBar'
import { useHoleComment, useHoleDetail } from '@/swr/hole'
import { HoleItem } from '@/pages/hole/items'
import { SkeletonLoading } from '@/components/Skeleton'
import { UserAvatar } from '@/components/UserAvatar'
import { Text } from 'react-native-paper'
import { IdText } from '@/components/Text/Id'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import React from 'react'

export function HoleDetail() {
  const { data, isSuccess } = useHoleDetail()

  const { isSuccess: isCommentSuccess, data: commentData } = useHoleComment()

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
        {!isSuccess && <SkeletonLoading nums={1} />}
        {isCommentSuccess && (
          <RefreshingFlatList
            ListHeaderComponent={() => <HoleItem data={data} />}
            data={commentData.pages}
            renderItem={({ item: group, index }) => (
              <View className={'space-y-2'} key={index}>
                {group.items.map((item) => (
                  <Text>{item.body}</Text>
                ))}
              </View>
            )}
          />
        )}
      </Page>
    </>
  )
}
