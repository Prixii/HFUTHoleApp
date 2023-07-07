import { View } from 'react-native'
import { RipplePressable } from '@/components/RipplePressable'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { BottomTabBarIcon } from '@/components/router/bottomTabBarIcon'
import { useBaseNotificationsQuery } from '@/swr/notify/useBaseNotifications'

import { Text, useTheme } from 'react-native-paper'
import { Badge } from '@/components/Badge'

export const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { totalCount } = useBaseNotificationsQuery()
  const theme = useTheme()

  return (
    <View
      className={
        'flex-row bottom-0 bg-white border-t-[1px] border-t-black/5 h-16 items-center'
      }
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const isNotifyRoute = route.name === 'notify'

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <RipplePressable
            onPress={onPress}
            key={index}
            className={'flex-1 rounded-full'}
          >
            <View
              className={'flex flex-1 items-center justify-center rounded-full'}
            >
              <View className={'relative'}>
                <BottomTabBarIcon route={route.key} isFocused={isFocused} />
                {isNotifyRoute && (
                  <View className={'absolute top-[-10] right-[-20]'}>
                    <Badge>{totalCount}</Badge>
                  </View>
                )}
              </View>
            </View>
          </RipplePressable>
        )
      })}
    </View>
  )
}
