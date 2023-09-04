import { View } from 'react-native'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { ProgressBar } from '@/components/ProgressBar'

type Props = {
  percent: number
} & Partial<IUserProfile['level']>

export function UserLevelBar(props: Props) {
  return (
    <View className={'flex-row space-x-2 justify-between items-center'}>
      <View>
        <SecondaryText variant={'bodySmall'}>
          LV.{props.level || 1}
        </SecondaryText>
      </View>
      <View>
        <ProgressBar percent={props.percent || 0} />
      </View>
      <View>
        <SecondaryText variant={'bodySmall'}>
          {props.experience || 0}/{props.nextLevelRequiredExperience || 0}
        </SecondaryText>
      </View>
    </View>
  )
}
