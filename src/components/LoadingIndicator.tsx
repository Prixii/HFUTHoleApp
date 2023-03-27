import {
  ActivityIndicator,
  ActivityIndicatorProps,
  useTheme,
} from 'react-native-paper'
import { View } from 'react-native'

export function LoadingIndicator(props: ActivityIndicatorProps) {
  const theme = useTheme()

  return (
    <View style={{ elevation: 1 }} className={'bg-white p-2 rounded-full'}>
      <ActivityIndicator
        color={theme.colors.primary}
        {...props}
      ></ActivityIndicator>
    </View>
  )
}
