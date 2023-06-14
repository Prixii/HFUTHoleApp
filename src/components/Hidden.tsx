import { ReactNode } from 'react'
import { View } from 'react-native'

interface Props {
  hidden: boolean
  children: ReactNode
  else?: ReactNode
}

export function Hidden(props: Props) {
  return (
    <>
      <View className={props.hidden && 'hidden'}>{props.children}</View>
      <View className={!props.hidden && 'hidden'}>{props.else}</View>
    </>
  )
}
