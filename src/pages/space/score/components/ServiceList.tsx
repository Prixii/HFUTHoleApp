import { View } from 'react-native'
import BilibiliSvg from '@/assets/svg/home/bilibili.svg'
import ScoreInterview from '@/assets/svg/space/score_interview.svg'
import FailureFate from '@/assets/svg/space/failure_rate.svg'
import CustomRanking from '@/assets/svg/space/custom_ranking.svg'
import Help from '@/assets/svg/space/help.svg'
import { Svg } from '@/components/svg/Svg'
import { Text, TouchableRipple } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const serviceList = [
  {
    title: '成绩概览',
    svg: ScoreInterview,
    route: 'space-nested',
    routeOption: {
      screen: 'score-overview',
    },
  },
  {
    title: '挂科率查询',
    svg: FailureFate,
    route: 'space-nested',
    routeOption: {
      screen: 'failure-rate',
    },
  },
  {
    title: '自定义排名',
    svg: CustomRanking,
    route: 'space-nested',
    routeOption: {
      screen: 'custom-ranking',
    },
  },
  {
    title: '成绩帮助',
    svg: Help,
    route: 'space-nested',
    routeOption: {
      screen: 'help',
      params: {
        type: 'score',
      },
    },
  },
]

export const ServiceList = () => {
  const { navigate } = useNavigation()
  return (
    <View className="flex flex-row justify-between">
      {serviceList.map((service) => (
        <TouchableRipple
          key={service.title}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          onPress={() => navigate(service.route, service.routeOption)}
        >
          <View className="flex justify-center items-center space-y-2 py-2">
            <Svg SvgComponent={service.svg} size={30} />
            <Text>{service.title}</Text>
          </View>
        </TouchableRipple>
      ))}
    </View>
  )
}
