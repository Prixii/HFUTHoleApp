import { Card } from '@/components/Card'
import { View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import {
  AwardIcon,
  UserIcon,
  UserFriendsIcon,
  FireIcon,
} from '@/components/icon'
import { useAppSelector } from '@/store/store'
import { useMemo, type ReactNode } from 'react'
import { objectMap, floatFixed } from '@/shared/utils/utils'
import {
  useScoreContext,
  type ScoreType,
} from '@/pages/space/score/ScoreContext'

interface ScoreInfo {
  key: keyof Rank
  title: string
  Icon: ReactNode
}

interface ToggleButton {
  key: ScoreType
  title: string
}

const useScoreCard = () => {
  const { rankType, scoreType, setScoreType } = useScoreContext()
  const { compulsoryRank, totalRank } = useAppSelector(
    (state) => state.spaceScore
  )

  const scoreData = useMemo(() => {
    const rankData = rankType === 'compulsory' ? compulsoryRank : totalRank
    return objectMap(
      scoreType === 'score' ? rankData.score : rankData.gpa,
      (value) => {
        if (value.toString().includes('.')) {
          return floatFixed(value)
        } else {
          return value
        }
      }
    ) as Rank
  }, [compulsoryRank, rankType, scoreType, totalRank])

  return {
    scoreData,
    scoreType,
    setScoreType,
  }
}

const toggleButtons: ToggleButton[] = [
  { key: 'score', title: '均分' },
  { key: 'gpa', title: 'GPA' },
]

const scoreInfos: ScoreInfo[] = [
  {
    key: 'mine',
    title: '我的成绩',
    Icon: <UserIcon size={16} color="#c1c1c1" />,
  },
  {
    key: 'avg',
    title: '专业平均',
    Icon: <UserFriendsIcon size={16} color="#c1c1c1" />,
  },
  {
    key: 'head',
    title: '专业前10%',
    Icon: <FireIcon size={16} color="#c1c1c1" />,
  },
  {
    key: 'max',
    title: '专业最高',
    Icon: <AwardIcon size={16} color="#c1c1c1" />,
  },
]

export const ScoreCard = () => {
  const { scoreData, scoreType, setScoreType } = useScoreCard()

  return (
    <Card>
      <View className="px-1 py-1">
        <View className="flex flex-row justify-between mb-2">
          <Text className="font-bold text-lg text-gray-300">专业排名</Text>
          {/* TODO 抽离成公共组件 */}
          <View className="flex flex-row">
            {toggleButtons.map((button) => (
              <Pressable
                key={button.key}
                onPress={() => setScoreType(button.key)}
                className={`py-1 px-4 rounded-md ${
                  button.key === scoreType ? 'bg-[#4e73f6]' : ''
                }`}
              >
                <Text className="text-white">{button.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Text
          variant="headlineMedium"
          className="text-white font-bold"
        >{`${scoreData.rank}/${scoreData.actualNum}`}</Text>

        <View className="flex flex-row justify-between rounded-md mt-2 p-2 bg-[#4e73f6]">
          {scoreInfos.map((info) => (
            <View key={info.key}>
              <Text className="text-gray-200 text-base">{info.title}</Text>
              <View className="flex flex-row mx-auto space-x-1">
                {info.Icon}
                <Text className="text-white">{scoreData[info.key]}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Card>
  )
}
