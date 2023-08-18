import { ToTopFAB } from '@/components/ToTopFAB'
import Animated, {
  SlideInRight,
  SlideOutRight,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { Func } from '@/shared/types'

interface Props {
  goToTop: Func
  visible: boolean
}

export function AnimatedToTopFAB({ goToTop, visible }: Props) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(visible ? 0 : 100) }],
    }
  }, [visible])

  return (
    <>
      <Animated.View style={animatedStyle}>
        <ToTopFAB onPress={goToTop} />
      </Animated.View>
    </>
  )
}
