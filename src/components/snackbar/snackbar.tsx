import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Icons } from '@/components/icon'

interface IProps {
  text: string

  icon: string

  error?: boolean
}

export function Snackbar(props: IProps) {
  return (
    <View
      className={`${
        props.error ? 'bg-[#FFE7D9]' : 'bg-[#D0F2FF]'
      } rounded-lg flex flex-row space-x-2 p-3 items-center`}
    >
      <View>
        <Icons
          name={props.icon}
          size={20}
          color={props.error ? '#FF5951' : '#2B9AFF'}
        />
      </View>
      <Text
        className={`flex-1 ${
          props.error ? 'text-[#7A0C2E]' : 'text-[#04297A]'
        } text-xs`}
      >
        {props.text}
      </Text>
    </View>
  )
}
