import { ScrollView, View } from 'react-native'
import { HoleList } from '@/pages/hole/list'
import { HolePostFAB } from '@/pages/hole/PostFab'
import { HoleHeader } from '@/pages/hole/header'

export const Hole = () => {
  return (
    <>
      <View>
        <HoleHeader />
      </View>
      <HoleList />
      <HolePostFAB />
    </>
  )
}
