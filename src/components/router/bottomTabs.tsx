import { Pressable, View, TouchableOpacity } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { BottomTabBarIcon } from '@/components/router/bottomTabBarIcon'
import { useBaseNotificationsQuery } from '@/swr/notify/useBaseNotifications'
import { Badge } from '@/components/Badge'
import { SafeAreaView } from 'react-native-safe-area-context'
import { isIOS } from '@/shared/utils/is'
import { TouchableRipple } from 'react-native-paper'

// TODO: Theming
export const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { totalCount } = useBaseNotificationsQuery()
  const PressComponent = isIOS ? TouchableOpacity : TouchableRipple

  return (
    <SafeAreaView
      className={'items-center justify-center bg-white'}
      edges={['bottom']}
    >
      <View
        className={
          'flex-row w-screen bottom-0 bg-white border-t-[1px] border-t-black/5 h-16 items-center'
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
            <PressComponent key={index} onPress={onPress} className={'flex-1'}>
              <View
                className={'flex-1 items-center justify-center rounded-full'}
              >
                <View className={'relative'}>
                  <BottomTabBarIcon route={route.key} isFocused={isFocused} />
                  {isNotifyRoute && totalCount > 0 && (
                    <View className={'absolute top-[-10] right-[-20]'}>
                      <Badge>{totalCount}</Badge>
                    </View>
                  )}
                </View>
              </View>
            </PressComponent>
          )
        })}
      </View>
    </SafeAreaView>
  )
}
