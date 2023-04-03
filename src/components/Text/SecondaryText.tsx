import { Text, TextProps, useTheme } from 'react-native-paper'

export function SecondaryText(props: TextProps<any>) {
  const theme = useTheme()

  return <Text {...props} style={{ color: theme.colors.surfaceVariant }}></Text>
}
