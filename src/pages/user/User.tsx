import { ScrollView, View } from 'react-native'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { Text } from 'react-native-paper'
import { UserIcons } from '@/pages/user/Icons'
import { UserHeaderInfo } from '@/pages/user/UserHeaderInfo'
import { useSpaceData } from '@/shared/hooks/useSpaceData'

export function User() {
  const {
    recentExams,
    spaceAuth: { isLogin },
    user: { card },
  } = useSpaceData()
  return (
    <ScrollView className={'flex space-y-4 p-4 bg-white'}>
      <UserHeaderInfo />
      <View className={'bg-white flex-row justify-between items-center'}>
        <View className={'flex-1 items-center space-y-1'}>
          <Text variant={'titleSmall'}>
            {isLogin ? card?.balance || '￥￥￥' : '请先登录课表哦'}
          </Text>
          <View>
            <SecondaryText variant={'bodySmall'}>一卡通余额</SecondaryText>
          </View>
        </View>
        <View className={'h-8 bg-black/10 w-[1px]'} />
        <View className={'flex-1 items-center space-y-1'}>
          <Text variant={'titleSmall'}>
            {isLogin ? `${recentExams.length}门` : '请先登录课表哦'}
          </Text>
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
