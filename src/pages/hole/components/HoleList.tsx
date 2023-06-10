import { LoadMore } from '@/components/LoadMore'
import { FlatListProps, View } from 'react-native'
import { HoleInfo } from '@/pages/hole/components/HoleInfo'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { UseInfiniteQueryResult } from 'react-query'
import { SkeletonLoading } from '@/components/Skeleton'
import { Func } from '@/shared/types'
import { useHoleDetailRoute } from '@/shared/hooks/route/useHoleDetailRoute'

// TODO 完善类型
type Props = UseInfiniteQueryResult<IHoleListResponse, unknown> & {
  invalidateQuery: Func
  ListHeaderComponent?: FlatListProps<any>['ListHeaderComponent']
}

export function RefreshableHoleList({
  isSuccess,
  data,
  hasNextPage,
  fetchNextPage,
  invalidateQuery,
  ListHeaderComponent,
}: Props) {
  const { go } = useHoleDetailRoute()

  return isSuccess ? (
    <RefreshingFlatList
      data={data?.pages}
      hasNextPage={hasNextPage}
      onRefreshing={fetchNextPage}
      onTopRefresh={invalidateQuery}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={() => (
        <LoadMore text={'没有更多树洞了哦'} hasNextPage={hasNextPage} />
      )}
      renderItem={({ item: group, index }) => (
        <View className={'space-y-2'} key={`${group.items?.[0]?.id}${index}`}>
          {group.items.map((item) => (
            <HoleInfo key={item.id} data={item} onPress={() => go(item.id)} />
          ))}
        </View>
      )}
    />
  ) : (
    <SkeletonLoading nums={3} />
  )
}
