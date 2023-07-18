import { View } from 'react-native'
import { useSystemNotificationsQuery } from '@/swr/notify/useSystemNotifications'
import { LoadingScreen } from '@/components/LoadingScreen'
import { flatInfiniteQueryData } from '@/swr/utils'
import { LoadMore } from '@/components/LoadMore'
import { RefreshingFlatList } from '@/components/RefreshingFlatList'
import { SystemNotificationItem } from '@/pages/notify/system/SystemNotificationItem'

export function SystemNotificationScreen() {
  const { isLoading, data, hasNextPage, invalidateQuery, fetchNextPage } =
    useSystemNotificationsQuery()

  const { data: flattenData } =
    flatInfiniteQueryData<INotifySystemListItem>(data)

  // TODO useReadNotifications('system')

  return (
    <LoadingScreen isLoading={isLoading}>
      <RefreshingFlatList
        data={flattenData}
        hasNextPage={hasNextPage}
        onTopRefresh={invalidateQuery}
        onRefreshing={fetchNextPage}
        ListFooterComponent={() => (
          <LoadMore hasNextPage={hasNextPage!} text={'没有更多消息了哦'} />
        )}
        className={'p-2'}
        ItemSeparatorComponent={() => <View className={'h-4'} />}
        renderItem={({ item }) => (
          <SystemNotificationItem data={item} key={item.id} />
        )}
      />
    </LoadingScreen>
  )
}
