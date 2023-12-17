import { PageWithSafeArea } from '@/layouts/layout'
import { HolePostBody } from '@/pages/hole/post/body'
import { HolePostContextProvider } from '@/shared/context/hole'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

export function HolePost() {
  const theme = useTheme()

  return (
    <SafeAreaView className={'flex-1 bg-background'}>
      <HolePostContextProvider>
        <View
          className={'h-screen'}
          style={{ backgroundColor: theme.colors.background }}
        >
          <HolePostBody />
        </View>
      </HolePostContextProvider>
    </SafeAreaView>
  )
}
