import {
  IconButton as RNPIconButton,
  IconButtonProps,
  useTheme,
} from 'react-native-paper'
import { View } from 'react-native'

export function IconButton(props: IconButtonProps & { transparent?: boolean }) {
  const theme = useTheme()

  return (
    <View>
      <RNPIconButton iconColor={theme.colors.surfaceVariant} {...props} />
    </View>
  )
}
