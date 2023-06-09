import { ReactNode } from 'react'
import { TouchableRipple, TouchableRippleProps } from 'react-native-paper'

type Props = {
  children: ReactNode
} & TouchableRippleProps

export function RipplePressable({ children, ...props }: Props) {
  return (
    <TouchableRipple style={{ borderRadius: 9999 }} {...props}>
      {children}
    </TouchableRipple>
  )
}
