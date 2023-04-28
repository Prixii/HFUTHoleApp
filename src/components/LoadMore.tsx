import { Text, useTheme } from 'react-native-paper'
import { View } from 'react-native'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { getQAQFont } from '@/shared/utils/utils'

interface Props {
  text: string

  hasNextPage: boolean
}

export function LoadMore(props: Props) {
  const theme = useTheme()

  return (
    <View
      className={
        'w-screen px-5 justify-center flex flex-row items-center py-10'
      }
    >
      {props.hasNextPage ? (
        <LoadingIndicator />
      ) : (
        <Text style={{ color: theme.colors.surfaceVariant }}>
          {`${props.text}${props.text && getQAQFont('happy')}`}
        </Text>
      )}
    </View>
  )
}
