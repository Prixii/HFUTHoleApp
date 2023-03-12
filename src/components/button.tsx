import React, { ReactNode } from 'react'
import { Button as RNPButton } from 'react-native-paper'
import { Props as ButtonProps } from 'react-native-paper/src/components/Button/Button'

type Props = {
  children?: ReactNode
} & ButtonProps

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <RNPButton {...props} className={`${props.loading && 'bg-[#007B55]'}`}>
      {children}
    </RNPButton>
  )
}
