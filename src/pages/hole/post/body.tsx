import { Input } from '@/components/form/Input'
import { ScreenHeight } from '@/shared/utils/utils'
import { View } from 'react-native'
import { Control } from 'react-hook-form'
import { PostHoleValidator } from '@/shared/validators/hole'
import { BottomActions } from '@/pages/hole/post/BottomActions'

export interface HoleBodyProps {
  control: Control<PostHoleValidator>
}

export function HolePostBody(props: HoleBodyProps) {
  return (
    <View className={'p-5 rounded-lg bg-white'}>
      <Input
        name={'body'}
        control={props.control}
        multiline={true}
        style={{
          height: ScreenHeight * 0.6,
        }}
      />
      <BottomActions control={props.control} />
    </View>
  )
}
