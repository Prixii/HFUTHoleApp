import { Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Snackbar } from '@/components/snackbar/snackbar'
import { ReactNode } from 'react'

interface Props {
  title: string

  secondary: string

  snackbar: string

  children: ReactNode
}

export function AuthView(props: Props) {
  return (
    <View
      className={
        'bg-white min-h-screen w-screen overflow-hidden pt-[20px] px-5'
      }
    >
      <View className={'grid gap-5'}>
        <Avatar.Image source={require('../../../assets/img.png')} size={100} />
        <View className={'grid space-y-2'}>
          <Text className={'font-bold text-2xl'}>{props.title}</Text>
          <Text className={'text-gray-400'}>{props.secondary}</Text>
        </View>
        <View className={'mt-2'}>
          <Snackbar text={props.snackbar} icon={'info'} />
          <View className={'mt-2'}>{props.children}</View>
        </View>
      </View>
    </View>
  )
}
