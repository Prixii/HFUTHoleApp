import { PageWithSafeArea } from '@/layouts/layout'
import { HolePostBody } from '@/pages/hole/post/body'
import { HolePostContextProvider } from '@/shared/context/hole'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

export function HolePost() {
  const theme = useTheme()

  return (
    <PageWithSafeArea>

    <HolePostContextProvider>
      <View
        className={'h-screen'}
        style={{ backgroundColor: theme.colors.background }}
      >
        <HolePostBody />
      </View>
    </HolePostContextProvider>
    </PageWithSafeArea>
  )
}
