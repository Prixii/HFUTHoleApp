import React, { ReactNode, useState } from 'react'
import useKeyboardHeight from '@/shared/hooks/useKeyboardHeight'
import {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'
import { Actionsheet, KeyboardAvoidingView } from 'native-base'
import Animated from 'react-native-reanimated'

export interface ReplyProps {
  children: ReactNode
}

export function BottomSheetReply({ children }: ReplyProps) {
  const keyboardHeight = useKeyboardHeight()
  const [open, setOpen] = useState(false)

  const height = useDerivedValue(() => keyboardHeight + 175, [keyboardHeight])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(height.value),
    }
  })

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <>
      {open ? (
        <KeyboardAvoidingView behavior={'position'}>
          <Actionsheet isOpen={open} onClose={closeModal} hideDragIndicator>
            <Actionsheet.Content bg={'#fff'}>
              <Animated.View style={[animatedStyle]} className={'w-full'}>
                {children}
              </Animated.View>
            </Actionsheet.Content>
          </Actionsheet>
        </KeyboardAvoidingView>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
