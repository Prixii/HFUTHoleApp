import { Input } from '@/components/form/Input'
import { ScreenHeight } from '@/shared/utils/utils'
import { View } from 'react-native'
import { BottomActions } from '@/pages/hole/post/BottomActions'
import { useHolePostContext } from '@/shared/context/hole'
import { Tags } from '@/components/tags'

export function HolePostBody() {
  const {
    tags,
    form: { control },
  } = useHolePostContext()

  return (
    <View className={'p-5 rounded-lg bg-white'}>
      <Tags tags={tags} />
      <Input
        name={'body'}
        control={control}
        multiline={true}
        style={{
          height: ScreenHeight * 0.6,
        }}
      />
      <BottomActions />
    </View>
  )
}
