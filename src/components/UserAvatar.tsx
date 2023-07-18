import { Avatar } from 'react-native-paper'
import { useUserProfile } from '@/swr/user/profile'

interface Props {
  url: string

  size?: number

  mode?: 'sm' | 'md' | 'lg'
}

export function UserAvatar({ mode = 'sm', ...props }: Props) {
  const modeSize = mode === 'sm' ? 30 : mode === 'md' ? 40 : 55

  return (
    <Avatar.Image
      size={props.size || modeSize}
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
