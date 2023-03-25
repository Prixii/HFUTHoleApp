import React, { ReactNode } from 'react'
import { Button as RNPButton } from 'react-native-paper'
import { Props as ButtonProps } from 'react-native-paper/src/components/Button/Button'
import { View } from 'react-native'

type Props = {
  children?: ReactNode
} & ButtonProps

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <View>
      <RNPButton {...props}>{children}</RNPButton>
      {props.loading && (
        <View className={'w-full h-full bg-black/20 absolute rounded-full'} />
      )}
    </View>
  )
}
