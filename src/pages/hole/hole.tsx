import { HoleList } from '@/pages/hole/list'
import { HolePostFAB } from '@/pages/hole/PostFab'
import { Page } from '@/components/Page'
import { StatusBar, View } from 'react-native'
import { useTheme } from 'react-native-paper'

export const Hole = () => {
  const theme = useTheme()

  return (
    <>
      <StatusBar backgroundColor={theme.colors.background} />
      <Page>
        <View className={'pt-2'}>
          <HoleList />
        </View>
        <HolePostFAB />
      </Page>
    </>
  )
}
