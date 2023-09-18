import { ScrollView, View } from 'react-native'
import { UserIcons } from '@/pages/user/Icons'
import { UserHeaderInfo } from '@/pages/user/UserHeaderInfo'
import { SpaceBaseService } from './SpaceBaseService'

export function User() {
  return (
    <ScrollView className={'flex space-y-4 p-4 bg-white'}>
      <UserHeaderInfo />
      <View>
        <SpaceBaseService />
      </View>
      <View>
        <UserIcons />
      </View>
    </ScrollView>
  )
}
