import { Avatar } from 'react-native-paper'
import { useUserProfile } from '@/swr/user/profile'

interface Props {
  url: string

  size?: number
}

export function UserAvatar(props: Props) {
  return (
    <Avatar.Image
      size={props.size || 30}
      source={{
        uri: props.url,
      }}
    />
  )
}

export function MyAvatar(props: Omit<Props, 'url'>) {
  const { data } = useUserProfile()

  return <UserAvatar url={data?.avatar} {...props} />
}
