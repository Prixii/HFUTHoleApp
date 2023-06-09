import { SvgProps } from 'react-native-svg'
import React from 'react'
import { useTheme } from 'react-native-paper'

type Props = {
  active: boolean
  size: number
  SvgComponent: React.ComponentType<SvgProps>
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
