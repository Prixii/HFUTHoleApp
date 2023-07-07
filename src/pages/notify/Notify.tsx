import { FlatList, View } from 'react-native'
import { Avatar, Text, TouchableRipple } from 'react-native-paper'
import { AtIcon, NotifyIcon } from '@/components/icon'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { useBaseNotificationsQuery } from '@/swr/notify/useBaseNotifications'
import { useMemo } from 'react'
import { Badge } from '@/components/Badge'

export function Notify() {
  const { data } = useBaseNotificationsQuery()

  const { interaction, system } = data

  const list = useMemo(
    () => [
      {
        color: '#717DFE',
        title: '互动消息',
        body: interaction?.data?.body || '暂时没有互动消息',
        icon: AtIcon,
        count: interaction?.totalCount,
        onPress: () => {},
      },
      {
        color: '#FF9F23',
        title: '通知',
        body: system?.data?.body || '暂时没有通知',
        icon: NotifyIcon,
        count: 0,
      },
      {
        title: '班级团支书',
        body: '做一下青年大学习',
        img: 'https://c-ssl.duitang.com/uploads/blog/202208/08/20220808165611_1ba7f.jpeg',
        count: 0,
      },
    ],
    [data]
  )

  return (
    <View className={'bg-white h-full'}>
      <FlatList
        data={list}
        ListFooterComponent={() => (
          <View className={'flex-1 items-center py-4'}>
            <SecondaryText>- 没有更多了 -</SecondaryText>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableRipple onPress={() => {}}>
            <View className={'py-2 px-4 flex-row space-x-4 items-center'}>
              <View
                className={'rounded-full flex items-center justify-center'}
                style={{ backgroundColor: item.color, width: 60, height: 60 }}
              >
                {item.icon ? (
                  <Avatar.Icon
                    icon={item.icon}
                    style={{
                      backgroundColor: item.color,
                    }}
                    color={'#fff'}
                    size={50}
                  />
                ) : (
                  <Avatar.Image source={{ uri: item.img }} size={60} />
                )}
              </View>
              <View className={'flex-1'}>
                <Text variant={'bodyLarge'} className={'font-bold'}>
                  {item.title}
                </Text>
                <View>
                  <SecondaryText
                    variant={'bodyMedium'}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                  >
                    {item.body}
                  </SecondaryText>
                </View>
              </View>
              {item.count && <Badge>{item.count}</Badge>}
            </View>
          </TouchableRipple>
        )}
      />
    </View>
  )
}
