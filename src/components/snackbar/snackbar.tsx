import { View } from 'react-native'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export function Snackbar(props: IProps) {
  return <View className={'bg-[#D0F2FF] p-3 rounded-lg'}>{props.children}</View>
}
