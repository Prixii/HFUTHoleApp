import React, { ReactNode } from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

interface Props {
  duration?: number

  children: ReactNode
}

const FadeIn = ({ duration = 500, children }: Props) => {
  const opacity = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, { duration }),
    }
  })

  return <Animated.View style={[opacity]}>{children}</Animated.View>
}

export default FadeIn
