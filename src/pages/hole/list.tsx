import { useHoleList } from '@/swr/hole'
import { View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { HoleItem } from '@/pages/hole/items'
import { getQAQFont } from '@/shared/utils/utils'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { SkeletonLoading } from '@/components/Skeleton'

const LoadMore = () => {
  const { hasNextPage } = useHoleList()
  const theme = useTheme()

  return (
    <View
      className={'h-28 w-screen px-5 justify-center flex flex-row items-center'}
    >
      {hasNextPage ? (
        <LoadingIndicator />
      ) : (
        <Text style={{ color: theme.colors.secondary }}>
          没有更多树洞了哦{getQAQFont('happy')}
        </Text>
      )}
    </View>
  )
}

export function HoleList() {
  const { data, fetchNextPage, isSuccess } = useHoleList()

  const onRefresh = async () => {
    await fetchNextPage()
  }

  return (
    <>
      {!isSuccess && <SkeletonLoading nums={3} />}
      {isSuccess && (
        <>
          <RefreshingFlatList
            data={data?.pages}
            onRefreshing={onRefresh}
            ListFooterComponent={LoadMore}
            className={'min-h-80vh'}
            renderItem={({ item: group }) => (
              <View className={'px-2 space-y-2'} key={group.items[0].id}>
                {group.items.map((item) => (
                  <HoleItem data={item} key={item.id} />
                ))}
              </View>
            )}
          />
        </>
      )}
    </>
  )
}
