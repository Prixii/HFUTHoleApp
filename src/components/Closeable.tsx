import { Pressable, View } from 'react-native'
import { CloseIcon } from '@/components/icon'
import { Func } from '@/shared/types'

interface Props {
  onPress?: Func
}

export function Closeable(props: Props) {
  return (
    <Pressable className={'absolute right-[-4]'} onPress={props.onPress}>
      <View
        className={
          'w-4 h-4 rounded-full bg-gray-500/75 items-center justify-center'
        }
      >
        <CloseIcon size={8} active={true} />
      </View>
    </Pressable>
  )
}
