import { SvgProps } from 'react-native-svg'
import React from 'react'
import {
  TouchableRipple,
  TouchableRippleProps,
  useTheme,
} from 'react-native-paper'
import { isBoolean } from 'class-validator'
import { TouchableOpacity } from 'react-native'

type Props = {
  SvgComponent: React.ComponentType<SvgProps>
  size: number
  active?: boolean
} & SvgProps

export function Svg({ active, SvgComponent, size, ...props }: Props) {
  const theme = useTheme()

  return (
    <SvgComponent
      color={active ? theme.colors.primary : theme.colors.surfaceVariant}
      width={size}
      height={size}
      {...props}
    />
  )
}
