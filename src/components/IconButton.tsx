import {
  IconButton as RNPIconButton,
  IconButtonProps,
} from 'react-native-paper'

export function IconButton(props: IconButtonProps) {
  return (
    <RNPIconButton
      iconColor={'#00AB55'}
      {...props}
      className={`bg-[#00AB55]/20 ${props.className}`}
    />
  )
}
