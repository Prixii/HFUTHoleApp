import { RefreshControl, RefreshControlProps } from 'react-native'
import { useTheme } from 'react-native-paper'

export function RefreshIndicatorControl(props: RefreshControlProps) {
  const theme = useTheme()

  return <RefreshControl colors={[theme.colors.primary]} {...props} />
}
