import { Card } from '@/pages/space/components/Card'
import { View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import {
  AwardIcon,
  UserIcon,
  UserFriendsIcon,
  FireIcon,
} from '@/components/icon'
import { useAppSelector, useAppDispatch } from '@/store/store'
import { setScoreType, type ScoreType } from '@/store/reducer/spaceScore'
import { useMemo } from 'react'
import { formatScore } from '@/pages/space/@utils/utils'
import {
  ToggleButton,
  ButtonOptions,
} from '@/pages/space/score/components/ToggleButton'
import type { ScoreInfo } from '@/pages/space/@utils/types'

const buttonOptions: ButtonOptions<'score' | 'gpa'>[] = [
  { key: 'score', title: '均分' },
  { key: 'gpa', title: 'GPA' },
]

const scoreInfos: ScoreInfo[] = [
  {
    key: 'mine',
    title: '我的成绩',
    Icon: UserIcon,
  },
  {
    key: 'avg',
    title: '专业平均',
    Icon: UserFriendsIcon,
  },
  {
    key: 'head',
    title: '专业前10%',
    Icon: FireIcon,
  },
  {
    key: 'max',
    title: '专业最高',
    Icon: AwardIcon,
  },
]

export const ScoreCard = () => {
  const dispatch = useAppDispatch()
  const { compulsoryRank, totalRank, rankType, scoreType } = useAppSelector(
    (state) => state.spaceScore
  )

  const scoreData = useMemo(
    () => formatScore({ compulsoryRank, totalRank }, rankType, scoreType),
    [compulsoryRank, rankType, scoreType, totalRank]
  )

  return (
    <Card>
      <View className="px-1 py-1">
        <View className="flex flex-row justify-between mb-2">
          <Text className="font-bold text-lg text-gray-300">专业排名</Text>
          <ToggleButton
            buttonOptions={buttonOptions}
            currentKey={scoreType}
            onChange={(key) => dispatch(setScoreType(key))}
          />
        </View>

        <Text
          variant="headlineMedium"
          className="text-white font-bold"
        >{`${scoreData.rank}/${scoreData.total}`}</Text>

        <View className="flex flex-row justify-between rounded-md mt-2 p-2 bg-[#4e73f6]">
          {scoreInfos.map((info) => (
            <View key={info.key}>
              <Text className="text-gray-200 text-xs">{info.title}</Text>
              <View className="flex flex-row mx-auto space-x-1">
                <info.Icon />
                <Text className="text-white text-sm">
                  {scoreData[info.key]}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Card>
  )
}
