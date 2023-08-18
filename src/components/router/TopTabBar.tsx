import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { Pressable, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import { useCallback } from 'react'

export function TopTabBar({
  state,
  descriptors,
  jumpTo,
}: MaterialTopTabBarProps) {
  const handlePress = useCallback((route: string) => {
    jumpTo(route)
  }, [])

  return (
    <View
      className={
        'flex-1 flex-row space-x-3 px-6 py-4 items-center bg-transparent'
      }
    >
      {state.routes.map((route, index) => {
        const options = descriptors[route.key].options

        return (
          <Pressable key={route.key} onPress={() => handlePress(route.key)}>
            <TabBarItem
              isFocused={state.index === index}
              name={options.title!}
            />
          </Pressable>
        )
      })}
    </View>
  )
}

const TabBarItem = ({
  isFocused,
  name,
}: {
  isFocused: boolean
  name: string
}) => {
  const theme = useTheme()

  const Animation = {
    active: {
      color: '#000',
      fontSize: 18,
    },
    inactive: {
      color: theme.colors.surfaceVariant,
      fontSize: 16,
    },
  }

  const color = useDerivedValue(
    () => (isFocused ? Animation.active.color : Animation.inactive.color),
    [isFocused]
  )

  const fontSize = useDerivedValue(
    () => (isFocused ? Animation.active.fontSize : Animation.inactive.fontSize),
    [isFocused]
  )

  const style = useAnimatedStyle(() => {
    return {
      fontSize: withTiming(fontSize.value),
      color: withTiming(color.value),
      fontWeight: isFocused ? 'bold' : 'normal',
    }
  })

  return (
    <View>
      <Animated.Text style={style}>{name}</Animated.Text>
    </View>
  )
}
