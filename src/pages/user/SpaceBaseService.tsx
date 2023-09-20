import { SecondaryText } from '@/components/Text/SecondaryText'
import { useSpaceData } from '@/shared/hooks/useSpaceData'
import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { useLinkTo } from '@react-navigation/native'
import { useCallback } from 'react'

export const SpaceBaseService = () => {
  const linkTo = useLinkTo()
  const {
    recentExams,
    spaceAuth: { isLogin },
    user: { card },
  } = useSpaceData()

  const goToExamScreen = () => {
    if (isLogin) {
      linkTo('/space-nested/exam')
    }
  }

  return (
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
      <View className="flex-1 rounded-lg overflow-hidden">
        <TouchableRipple onPress={goToExamScreen}>
          <View className="my-3 items-center space-y-1">
            <Text variant={'titleSmall'}>
              {isLogin ? `${recentExams.length}门` : '请先登录课表哦'}
            </Text>
            <View>
              <SecondaryText variant={'bodySmall'}>最近考试</SecondaryText>
            </View>
          </View>
        </TouchableRipple>
      </View>
    </View>
  )
}
