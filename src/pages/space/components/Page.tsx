import { View, ViewProps } from 'react-native'
import { useTheme } from 'react-native-paper'

export function Page(props: ViewProps) {
  const theme = useTheme()

  return (
    <View
      {...props}
      className={`min-h-full w-full px-5 ${props.className}`}
      style={{
        backgroundColor: theme.colors.background,
      }}
    />
  )
}
