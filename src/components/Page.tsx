import { View, ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'react-native-paper'

export function Page(props: ViewProps) {
  const theme = useTheme()

  return (
    <SafeAreaView>
      <View
        {...props}
        className={`min-h-screen w-full px-2 ${props.className}`}
        style={{
          backgroundColor: theme.colors.background,
        }}
      />
    </SafeAreaView>
  )
}
