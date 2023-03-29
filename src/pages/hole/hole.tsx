import { View } from 'react-native'
import { HoleList } from '@/pages/hole/list'
import { HolePostFAB } from '@/pages/hole/PostFab'

export const Hole = () => {
  return (
    <View>
      <HoleList />
      <HolePostFAB />
    </View>
  )
}
