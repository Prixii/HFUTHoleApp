import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useEffect } from 'react'

interface Props {
  percent: number
}

export function ProgressBar(props: Props) {
  const progress = useSharedValue('100%')

  const progressStyle = useAnimatedStyle(() => ({
    right: withSpring(progress.value),
  }))

  useEffect(() => {
    progress.value = `${100 - props.percent}%`
  }, [props.percent])

  return (
    <View className={'rounded-full h-1 bg-gray-300 w-[130px]'}>
      <Animated.View
        className={'absolute rounded-full h-1 bg-[#1E4BF5]/80 left-0'}
        style={progressStyle}
      />
    </View>
  )
}
