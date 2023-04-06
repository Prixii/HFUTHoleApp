import {
  IconButton as RNPIconButton,
  IconButtonProps,
} from 'react-native-paper'
import { View } from 'react-native'

export function IconButton(props: IconButtonProps & { transparent?: boolean }) {
  return (
    <View>
      <RNPIconButton
        iconColor={'#00AB55'}
        {...props}
        className={`bg-[#00AB55]/20 ${props.transparent && 'bg-transparent'} ${
          props.className
        }`}
      />
    </View>
  )
}
