import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useEffect } from 'react'

export function ProgressBar() {
  const progress = useSharedValue('100%')

  const progressStyle = useAnimatedStyle(() => ({
    right: withSpring(progress.value),
  }))

  useEffect(() => {
    progress.value = `${100 - (318 / 500) * 100}%`
  }, [])

  return (
    <View className={'rounded-full h-2 bg-gray-400 w-[150px]'}>
      <Animated.View
        className={'absolute rounded-full h-2 bg-[#1E4BF5] left-0'}
        style={progressStyle}
      />
    </View>
  )
}
