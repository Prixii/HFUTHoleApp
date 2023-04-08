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
          'w-3 h-3 rounded-full bg-gray-500/40 items-center justify-center'
        }
      >
        <CloseIcon size={8} />
      </View>
    </Pressable>
  )
}
