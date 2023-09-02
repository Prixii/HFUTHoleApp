import { Card } from '@/pages/space/components/Card'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { type ScoreType } from '@/store/reducer/spaceScore'
import { ToggleButton, ButtonOptions } from '@/components/button/ToggleButton'
import {
  AwardIcon,
  UserIcon,
  UserFriendsIcon,
  FireIcon,
} from '@/components/icon'
import type { ScoreInfo, CardScoreData } from '@/pages/space/@utils/types'

const defaultScoreInfos: ScoreInfo[] = [
  {
    key: 'mine',
    title: '我的成绩',
    Icon: <UserIcon size={12} color={'#fff'} style={{ opacity: 0.8 }} />,
  },
  {
    key: 'avg',
    title: '专业平均',
    Icon: <UserFriendsIcon size={12} color={'#fff'} style={{ opacity: 0.8 }} />,
  },
  {
    key: 'head',
    title: '专业前10%',
    Icon: <FireIcon size={12} color={'#fff'} style={{ opacity: 0.8 }} />,
  },
  {
    key: 'max',
    title: '专业最高',
    Icon: <AwardIcon size={12} color={'#fff'} style={{ opacity: 0.8 }} />,
  },
]

interface ScoreCardProps<T = any> {
  scoreData: CardScoreData
  scoreType: ScoreType
  scoreButtonOptions: ButtonOptions<ScoreType>[]
  scoreInfos?: ScoreInfo[]
  title?: string
  rankType?: T
  rankButtonOptions?: ButtonOptions<T>[]
  onScoreTypeChange?: (key: ScoreType) => void
  onRankTypeChange?: (key: T) => void
}

export const ScoreCard = ({
  scoreData,
  scoreType,
  scoreButtonOptions,
  scoreInfos = defaultScoreInfos,
  title,
  rankButtonOptions,
  rankType,
  onScoreTypeChange,
  onRankTypeChange,
}: ScoreCardProps) => {
  return (
    <Card>
      <View className="px-1 py-1 space-y-2">
        <View className="flex flex-row justify-between mb-2">
          <Text className="text-white/70">{title}</Text>
          <ToggleButton
            buttonOptions={scoreButtonOptions}
            currentKey={scoreType}
            onChange={onScoreTypeChange}
          />
        </View>

        <Text className="text-white text-2xl">{`${scoreData.rank}/${scoreData.total}`}</Text>

        <View>
          {rankButtonOptions && (
            <ToggleButton
              style={{ justifyContent: 'space-between' }}
              buttonOptions={rankButtonOptions}
              currentKey={rankType}
              onChange={onRankTypeChange}
            />
          )}
        </View>

        <View
          className="flex flex-row justify-between rounded-md mt-2 px-4 py-2"
          style={{ backgroundColor: 'rgba(255, 255, 255, .15)' }}
        >
          {scoreInfos.map((info) => (
            <View key={info.key}>
              <Text className="text-white/80 text-xs">{info.title}</Text>
              <View className="flex flex-row mx-auto space-x-1 items-center self-start">
                {info.Icon}
                <Text className="text-white/80 text-sm">
                  {scoreData[info.key]?.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Card>
  )
}
