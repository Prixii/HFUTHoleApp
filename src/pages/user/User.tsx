import { ScrollView, StatusBar, View } from 'react-native'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { Text } from 'react-native-paper'
import { UserIcons } from '@/pages/user/Icons'
import { UserHeaderInfo } from '@/pages/user/UserHeaderInfo'

export function User() {
  return (
    <ScrollView className={'flex space-y-4 px-2 py-4 bg-white'}>
      <StatusBar backgroundColor={'white'} />
      <UserHeaderInfo />
      <View className={'bg-white flex-row justify-between items-center'}>
        <View className={'flex-1 items-center space-y-1'}>
          <Text variant={'titleSmall'}>¥9999.00</Text>
          <View>
            <SecondaryText variant={'bodySmall'}>一卡通余额</SecondaryText>
          </View>
        </View>
        <View className={'h-8 bg-black/10 w-[1px]'} />
        <View className={'flex-1 items-center space-y-1'}>
          <Text variant={'titleSmall'}>2门</Text>
          <View>
            <SecondaryText variant={'bodySmall'}>最近考试</SecondaryText>
          </View>
        </View>
      </View>
      <View>
        <UserIcons />
      </View>
    </ScrollView>
  )
}
