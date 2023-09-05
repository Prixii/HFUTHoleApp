import { formatDate } from '@/shared/utils/utils'
import { Text, useTheme } from 'react-native-paper'
import type { Props as TextProps } from 'react-native-paper/src/components/Typography/Text'

type Props = {
  time: string
} & Partial<TextProps<any>>

export function TimeText({ time, ...props }: Props) {
  const theme = useTheme()

  return (
    <Text
      className={'text-xs'}
      style={{
        color: theme.colors.surface,
      }}
      {...props}
    >
      {formatDate(time)}
    </Text>
  )
}
