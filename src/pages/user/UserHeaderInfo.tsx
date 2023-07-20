import { Pressable, View } from 'react-native'
import { MyAvatar } from '@/components/UserAvatar'
import { Text } from 'react-native-paper'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { RightIcon } from '@/components/icon'
import { useUserProfile } from '@/swr/user/profile'
import { useUserProfileRoute } from '@/shared/hooks/route/useUserProfileRoute'
import { UserLevelBar } from '@/pages/user/components/UserLevelBar'

export function UserHeaderInfo() {
  const { data } = useUserProfile()

  const { goTo } = useUserProfileRoute()

  return (
    <Pressable
      className={'flex flex-row items-center justify-between'}
      onPress={goTo}
    >
      <View className={'flex flex-row items-center space-x-2'}>
        <MyAvatar size={55} />
        <View className={'space-y-1'}>
          <View className={'flex-row justify-between items-center'}>
            <Text className={'text-xl'}>{data?.username}</Text>
          </View>
          <UserLevelBar />
        </View>
      </View>
      <View className={'flex-row items-center'}>
        <SecondaryText>空间</SecondaryText>
        <RightIcon />
      </View>
    </Pressable>
  )
}
