import { formatDate } from '@/shared/utils/utils'
import { Text, useTheme } from 'react-native-paper'

interface Props {
  time: string
}

export function TimeText(props: Props) {
  const theme = useTheme()

  return (
    <Text
      className={'text-xs'}
      style={{
        color: theme.colors.surface,
      }}
    >
      {formatDate(props.time)}
    </Text>
  )
}
