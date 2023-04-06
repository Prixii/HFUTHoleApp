import { HoleHeader } from '@/pages/hole/header'
import { LoadMore } from '@/components/LoadMore'
import { View } from 'react-native'
import { HoleInfo } from '@/pages/hole/components/HoleInfo'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { UseInfiniteQueryResult } from 'react-query'
import { useNavigation } from '@react-navigation/native'
import { SkeletonLoading } from '@/components/Skeleton'
import { Func } from '@/shared/types'

// TODO 完善类型
type Props = UseInfiniteQueryResult<IHoleListResponse, unknown> & {
  invalidateQuery: Func
}

export function RefreshableHoleList({
  isSuccess,
  data,
  hasNextPage,
  fetchNextPage,
  invalidateQuery,
}: Props) {
  const navigation = useNavigation()

  return (
    <RefreshingFlatList
      data={data?.pages}
      onRefreshing={fetchNextPage}
      onTopRefresh={invalidateQuery}
      ListHeaderComponent={HoleHeader}
      ListFooterComponent={() => (
        <LoadMore text={'没有更多树洞了哦'} hasNextPage={hasNextPage} />
      )}
      renderItem={({ item: group, index }) =>
        isSuccess ? (
          <View className={'space-y-2'} key={index}>
            {group.items.map((item) => (
              <HoleInfo
                data={item}
                onPress={() => navigation.navigate('detail', { id: item.id })}
              />
            ))}
          </View>
        ) : (
          <SkeletonLoading nums={3} />
        )
      }
    />
  )
}
