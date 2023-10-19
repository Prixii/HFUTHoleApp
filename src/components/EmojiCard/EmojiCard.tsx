import { View } from 'react-native'
import { useRef } from 'react'
import { AllEmoji } from './AllEmoji'
import { RecentEmoji } from './RecentEmoji'
import Animated, {
  BounceInDown,
  BounceInUp,
  FadeInDown,
  FadeInUp,
  PinwheelIn,
  PinwheelOut,
  SlideInDown,
  SlideInUp,
  SlideOutUp,
  StretchInX,
  StretchOutY,
  ZoomInDown,
  ZoomInUp,
} from 'react-native-reanimated'

export const EmojiCard = () => {
  const componentRef = useRef(null)

  return (
    <Animated.View entering={ZoomInDown} exiting={ZoomInUp}>
      <View
        ref={componentRef}
        className={
          'absolute z-[2] top-[-20] left-4 right-4 bg-white rounded-lg p-2'
        }
        style={{
          shadowColor: '#888',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <RecentEmoji />
        <AllEmoji />
      </View>
    </Animated.View>
  )
}
