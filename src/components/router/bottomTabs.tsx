import { View } from 'react-native'
import { RipplePressable } from '@/components/RipplePressable'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { BottomTabBarIcon } from '@/components/router/bottomTabBarIcon'

export const BottomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View
      className={
        'flex-row absolute bottom-0 bg-white border-t-[1px] border-t-black/5'
      }
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index

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
          <View key={index} className={'flex-1 rounded-full'}>
            <RipplePressable onPress={onPress}>
              <View
                className={
                  'flex flex-1 items-center justify-center rounded-full py-4'
                }
              >
                <BottomTabBarIcon route={route.key} isFocused={isFocused} />
              </View>
            </RipplePressable>
          </View>
        )
      })}
    </View>
  )
}
