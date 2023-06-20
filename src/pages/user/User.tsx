import { ScrollView, View } from 'react-native'
import { MyAvatar } from '@/components/UserAvatar'
import { useUserProfile } from '@/swr/user/profile'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { ProgressBar } from '@/components/ProgressBar'
import { Text, TouchableRipple, useTheme } from 'react-native-paper'
import { Svg } from '@/components/svg/Svg'
import { UserIcons } from '@/pages/user/Icons'
import SettingSvg from '@/assets/svg/setting.svg'

export function User() {
  const { data } = useUserProfile()
  const theme = useTheme()

  return (
    <ScrollView className={'flex space-y-4 px-2 py-4 bg-white/20'}>
      <View className={'flex flex-row space-x-4 items-center'}>
        <View>
          <MyAvatar size={75} />
        </View>
        <View className={'space-y-1'}>
          <View className={'flex-row justify-between items-center'}>
            <Text className={'text-xl'}>{data?.username}</Text>
            <Svg
              SvgComponent={SettingSvg}
              size={25}
              color={'#000'}
              onPress={() => {}}
            />
          </View>
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
        <View className={'flex-1 items-center space-y-1'}>
          <Text variant={'titleLarge'}>¥9999.00</Text>
          <View>
            <SecondaryText>一卡通余额</SecondaryText>
          </View>
        </View>
        <View className={'h-16 bg-black/10 w-[1px]'} />
        <View className={'flex-1 items-center space-y-1'}>
          <Text variant={'titleLarge'}>¥9999.00</Text>
          <View>
            <SecondaryText>一卡通余额</SecondaryText>
          </View>
        </View>
      </View>
      <View>
        <UserIcons />
      </View>
    </ScrollView>
  )
}
