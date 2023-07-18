import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { useInteractiveNotificationsQuery } from '@/swr/notify/useInteractiveNotifications'
import { useMemo } from 'react'
import { flatInfiniteQueryData } from '@/swr/utils'
import { InteractiveNotifyItem } from '@/pages/notify/interaction/components/InteractiveNotifyItem'
import { LoadMore } from '@/components/LoadMore'

export function RefreshingInteractiveNotifications() {
  const { data, hasNextPage, fetchNextPage, invalidateQuery } =
    useInteractiveNotificationsQuery()

  const { data: listData } = useMemo(
    () => flatInfiniteQueryData<INotifyInteractionListItem>(data!),
    [data]
  )

  return (
    <RefreshingFlatList
      data={listData}
      hasNextPage={hasNextPage}
      onTopRefresh={invalidateQuery}
      onRefreshing={fetchNextPage}
      ListFooterComponent={() => (
        <LoadMore hasNextPage={hasNextPage!} text={'没有更多消息了哦'} />
      )}
      renderItem={({ item }) => (
        <InteractiveNotifyItem key={item.id} data={item} />
      )}
    />
  )
}
