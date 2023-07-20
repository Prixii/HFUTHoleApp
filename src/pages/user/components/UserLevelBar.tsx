import { View } from 'react-native'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { ProgressBar } from '@/components/ProgressBar'

export function UserLevelBar() {
  return (
    <View className={'flex-row space-x-2 justify-between items-center'}>
      <View>
        <SecondaryText variant={'bodySmall'}>LV.3</SecondaryText>
      </View>
      <View>
        <ProgressBar />
      </View>
      <View>
        <SecondaryText variant={'bodySmall'}>318/500</SecondaryText>
      </View>
    </View>
  )
}
