import { ScoreScrollWrapper } from '@/pages/space/components/ScoreScrollWrapper'
import { ScoreCard } from '@/pages/space/score/components/ScoreCard'
import { ServiceList } from '@/pages/space/score/components/ServiceList'
import { View } from 'react-native'
import { SemesterScoreChart } from '@/pages/space/score/components/SemesterScoreChart'
import { useScoreCard } from './useScoreCard'

export const Score = () => {
  const { buttonOptions, handleScoreTypeChange, scoreData, scoreType } =
    useScoreCard()

  return (
    <ScoreScrollWrapper>
      <View className={'w-screen px-4'}>
        <View className={'rounded-lg space-y-4'}>
          <ScoreCard
            title="专业排名"
            scoreData={scoreData}
            scoreType={scoreType}
            scoreButtonOptions={buttonOptions}
            onScoreTypeChange={handleScoreTypeChange}
          />
          <View className={'bg-white px-4 py-2 rounded-lg'}>
            <View className="mt-6">
              <ServiceList />
            </View>
            <View className="w-full h-[300px] mt-10">
              <SemesterScoreChart />
            </View>
          </View>
        </View>
      </View>
    </ScoreScrollWrapper>
  )
}
