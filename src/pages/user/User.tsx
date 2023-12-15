import { ScrollView, View } from 'react-native'
import { UserIcons } from '@/pages/user/Icons'
import { UserHeaderInfo } from '@/pages/user/UserHeaderInfo'
import { useSpaceData } from '@/shared/hooks/useSpaceData'
import { SpaceBaseService } from './SpaceBaseService'
import { SafeAreaView } from 'react-native-safe-area-context'

export function User() {
  return (
    <SafeAreaView className={'bg-white p-4 flex-1'}>
      <ScrollView className={'space-y-4'}>
        <UserHeaderInfo />
        <View>
          <SpaceBaseService />
        </View>
        <View>
          <UserIcons />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
