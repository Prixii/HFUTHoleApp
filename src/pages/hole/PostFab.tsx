import { useLinkTo } from '@react-navigation/native'
import { PostFAB } from '@/components/PostFAB'
import { useCallback } from 'react'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'

export function AnimatedHolePostFAB({ offset }: { offset: number }) {
  const linkTo = useLinkTo()

  const onPress = useCallback(() => {
    linkTo('/hole/post')
  }, [linkTo])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(offset) }],
    }
  }, [offset])

  return (
    <Animated.View style={animatedStyle}>
      <PostFAB onPress={onPress} />
    </Animated.View>
  )
}
