import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'

export function TopTabBar({ state, descriptors }: MaterialTopTabBarProps) {
  return (
    <View className={'flex-row space-x-3 px-6 py-4 items-center'}>
      {state.routes.map((route, index) => {
        const options = descriptors[route.key].options

        return (
          <View>
            <TabBarItem
              isFocused={state.index === index}
              name={options.title}
            />
          </View>
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
      fontSize: withTiming(fontSize.value, { duration: 250 }),
      color: withTiming(color.value, { duration: 250 }),
      fontWeight: isFocused ? 'bold' : 'normal',
    }
  }, [isFocused])

  return (
    <View>
      <Animated.Text style={style}>{name}</Animated.Text>
    </View>
  )
}
