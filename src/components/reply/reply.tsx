import React, { ReactNode } from 'react'
import useKeyboardHeight from '@/shared/hooks/useKeyboardHeight'
import {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'
import { Actionsheet, KeyboardAvoidingView } from 'native-base'
import Animated from 'react-native-reanimated'

export interface ReplyProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data: IHoleCommentListItem
  children: ReactNode
}

export function BottomSheetReply({ open, setOpen, children }: ReplyProps) {
  const keyboardHeight = useKeyboardHeight()

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
    <KeyboardAvoidingView behavior={'position'}>
      <Actionsheet isOpen={open} onClose={closeModal} hideDragIndicator>
        <Actionsheet.Content bg={'#fff'}>
          <Animated.View style={[animatedStyle]} className={'w-full'}>
            {children}
          </Animated.View>
        </Actionsheet.Content>
      </Actionsheet>
    </KeyboardAvoidingView>
  )
}
