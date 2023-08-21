import useKeyboardHeight from '@/shared/hooks/useKeyboardHeight'
import { View } from 'react-native'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export function AvoidingKeyboardVisible(props: Props) {
  const height = useKeyboardHeight()

  return (
    <View
      className={'flex-1'}
      style={{
        bottom: height,
      }}
    >
      {props.children}
    </View>
  )
}
