import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Icons } from '@/components/icon'

interface IProps {
  text: string

  icon: string
}

export function Snackbar(props: IProps) {
  return (
    <View className={'bg-[#D0F2FF] rounded-lg flex flex-row space-x-2 p-3'}>
      <View>
        <Icons name={props.icon} size={20} color={'#2B9AFF'} />
      </View>
      <Text className={'flex-1 text-[#04297A] text-xs'}>{props.text}</Text>
    </View>
  )
}
