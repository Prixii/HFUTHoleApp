import { View } from 'react-native'
import { MyAvatar } from '@/components/UserAvatar'
import { useUserProfile } from '@/swr/user/profile'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { ProgressBar } from '@/components/ProgressBar'
import { Text, useTheme } from 'react-native-paper'
import { AtIcon, LikeIcon } from '@/components/icon'

export function User() {
  const { data } = useUserProfile()
  const theme = useTheme()

  return (
    <View className={'flex space-y-5 px-2 py-4 bg-white/20'}>
      <View className={'flex flex-row space-x-4 items-center'}>
        <View>
          <MyAvatar size={75} />
        </View>
        <View className={'space-y-1'}>
          <Text className={'text-xl'}>{data?.username}</Text>
          <View className={'flex-row space-x-2 justify-between items-center'}>
            <View>
              <SecondaryText variant={'bodySmall'}>LV.3</SecondaryText>
            </View>
            <View>
              <ProgressBar />
            </View>
            <View>
              <SecondaryText variant={'bodySmall'}>318/500</SecondaryText>
            </View>
          </View>
        </View>
      </View>
      <View
        className={
          'rounded-2xl bg-white flex-row justify-between py-5 items-center'
        }
        style={{ elevation: 0.5 }}
      >
        <View className={'flex-1 items-center space-y-3'}>
          <Text variant={'titleMedium'}>¥9999.00</Text>
          <SecondaryText>一卡通余额</SecondaryText>
        </View>
        <View className={'h-16 bg-black/10 w-[1px]'} />
        <View className={'flex-1 items-center'}>
          <Text variant={'titleMedium'}>2门</Text>
          <SecondaryText>最近考试</SecondaryText>
        </View>
      </View>
      <View className={'flex-row flex-wrap space-y-2 items-center'}></View>
    </View>
  )
}
