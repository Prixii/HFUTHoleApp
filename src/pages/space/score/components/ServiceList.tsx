import { View } from 'react-native'
import BilibiliSvg from '@/assets/svg/home/bilibili.svg'
import { Svg } from '@/components/svg/Svg'
import { Text, TouchableRipple } from 'react-native-paper'

const serviceList = [
  { title: '成绩概览', svg: BilibiliSvg },
  { title: '挂科率查询', svg: BilibiliSvg },
  { title: '自定义排名', svg: BilibiliSvg },
  { title: '成绩帮助', svg: BilibiliSvg },
]

export const ServiceList = () => {
  return (
    <View className="flex flex-row justify-between">
      {serviceList.map((service) => (
        <TouchableRipple key={service.title}>
          <View className="flex justify-center items-center space-y-2 py-2">
            <Svg SvgComponent={service.svg} size={30} />
            <Text>{service.title}</Text>
          </View>
        </TouchableRipple>
      ))}
    </View>
  )
}
