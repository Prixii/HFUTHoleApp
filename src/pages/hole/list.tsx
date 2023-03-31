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
import { LoadMore } from '@/components/LoadMore'

export function HoleList() {
  const navigation = useNavigation()

  const { data, fetchNextPage, isSuccess, invalidateQuery, hasNextPage } =
    useHoleList()

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
            ListFooterComponent={() => (
              <LoadMore text={'没有更多树洞了哦'} hasNextPage={hasNextPage} />
            )}
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
