import { Avatar } from 'react-native-paper'

interface Props {
  url: string
}

export function UserAvatar(props: Props) {
  return (
    <Avatar.Image
      size={50}
      source={{
        uri: props.url,
      }}
    />
  )
}
