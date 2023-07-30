import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { ScoreDetailChart } from '@/pages/space/score/score-info/Chart'

interface DetailDetailProps {
  details: SingleScoreDetail[]
}

export const ScoreDetail = ({ details }: DetailDetailProps) => {
  return (
    <View className="mt-6 rounded-md px-5 py-6 bg-white space-y-4">
      <View className="flex flex-row">
        <Text className="flex-1 text-[#616161]">成绩类型</Text>
        <Text className="flex-1 text-[#616161] text-center">分数</Text>
        <Text className="flex-1 text-[#616161] text-center">排名</Text>
      </View>

      <View>
        {details.map((item) => (
          <View key={item.name}>
            <View className="flex flex-row my-4">
              <Text className="flex-1 text-base text-gray-800">
                {item.name}
              </Text>
              <Text className="flex-1 text-base text-gray-800 text-center">
                {item.mine}
              </Text>
              <Text className="flex-1 text-center">{`${item.rank}/${item.actualNum}`}</Text>
            </View>
            <View className="h-[1px] w-full bg-gray-200 rounded-sm" />
          </View>
        ))}
      </View>

      <View className={'w-full h-96'}>
        <ScoreDetailChart data={details} />
      </View>
    </View>
  )
}
