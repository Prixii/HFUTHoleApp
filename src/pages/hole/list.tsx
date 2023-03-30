import { useHoleList } from '@/swr/hole'
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackComponent,
  View,
} from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { HoleItem } from '@/pages/hole/items'
import { getQAQFont } from '@/shared/utils/utils'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { SkeletonLoading } from '@/components/Skeleton'
import { useLinkTo, useNavigation } from '@react-navigation/native'
import { HoleHeader, SelectListHoleListMode } from '@/pages/hole/header'

const LoadMore = () => {
  const { hasNextPage } = useHoleList()
  const theme = useTheme()

  return (
    <View
      className={'w-screen px-5 justify-center flex flex-row items-center py-4'}
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
  const navigation = useNavigation()

  const { data, fetchNextPage, isSuccess, invalidateQuery } = useHoleList()

  const onRefresh = async () => {
    await fetchNextPage()
  }

  const refetchData = async () => {
    await invalidateQuery()
  }

  return (
    <>
      {!isSuccess && <SkeletonLoading nums={3} />}
      {isSuccess && (
        <>
          <RefreshingFlatList
            data={data?.pages}
            onRefreshing={onRefresh}
            onTopRefresh={refetchData}
            ListHeaderComponent={HoleHeader}
            ListFooterComponent={LoadMore}
            renderItem={({ item: group, index }) => (
              <View className={'space-y-2'} key={index}>
                {group.items.map((item) => (
                  <HoleItem
                    data={item}
                    onPress={() =>
                      navigation.navigate('detail', { id: item.id })
                    }
                  />
                ))}
              </View>
            )}
          />
        </>
      )}
    </>
  )
}
