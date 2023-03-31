import { View, ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function Page(props: ViewProps) {
  return (
    <SafeAreaView>
      <View
        {...props}
        className={`min-h-screen w-full bg-[#E0E9E0] px-2 ${props.className}`}
      />
    </SafeAreaView>
  )
}
