import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

export function Separator() {
  const theme = useTheme()

  return (
    <View
      className={'h-2 w-full'}
      style={{ backgroundColor: theme.colors.background }}
    />
  )
}
