import { ReactNode } from 'react'
import { TouchableRipple, TouchableRippleProps } from 'react-native-paper'

type Props = {
  children: ReactNode
} & TouchableRippleProps

export function RipplePressable({ children, ...props }: Props) {
  return <TouchableRipple {...props}>{children}</TouchableRipple>
}
