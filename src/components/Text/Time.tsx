import { formatDate } from '@/shared/utils/utils'
import { Text } from 'react-native-paper'

interface Props {
  time: string
}

export function TimeText(props: Props) {
  return (
    <Text className={'text-gray-500/50 text-xs'}>{formatDate(props.time)}</Text>
  )
}
