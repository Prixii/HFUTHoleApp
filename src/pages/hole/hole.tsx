import { View } from 'react-native'
import { HoleList } from '@/pages/hole/list'
import { HolePostFAB } from '@/pages/hole/PostFab'
import Toast from 'react-native-toast-message'

export const Hole = () => {
  Toast.show({
    type: 'success',
    text1: '1',
  })
  return (
    <View>
      <HoleList />
      <HolePostFAB />
    </View>
  )
}
