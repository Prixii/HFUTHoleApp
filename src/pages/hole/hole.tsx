import { HoleList } from '@/pages/hole/list'
import { HolePostFAB } from '@/pages/hole/PostFab'
import { Page } from '@/components/Page'
import { View } from 'react-native'

export const Hole = () => {
  return (
    <>
      <Page>
        <View className={'pt-2'}>
          <HoleList />
        </View>
        <HolePostFAB />
      </Page>
    </>
  )
}
