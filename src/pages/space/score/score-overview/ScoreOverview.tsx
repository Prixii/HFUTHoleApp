import { useMemo, useRef } from 'react'
import { View, Animated, Dimensions } from 'react-native'
import { useAppSelector } from '@/store/store'
import { formatScore } from '@/pages/space/@utils/utils'
import { Empty } from '@/components/image/Empty'
import { ScoreOverviewPage, type SemesterInfo } from './ScoreOverviewPage'
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view'
import { SlidingDot } from 'react-native-animated-pagination-dots'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

export const ScoreOverview = () => {
  const { semesters, rankType } = useAppSelector((state) => state.spaceScore)
  const width = Dimensions.get('window').width
  const paperViewRef = useRef<PagerView>(null)
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current
  const positionAnimatedValue = useRef(new Animated.Value(0)).current
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange: [0, semesters.length],
    outputRange: [0, semesters.length * width],
  })

  const onPageScroll = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const semestersInfo = useMemo(
    () =>
      semesters.map<SemesterInfo>((item) => ({
        semester: item.semester,
        scores: item.scores,
        semesterId: item.semesterId,
        scoreData: formatScore(
          { compulsoryRank: item.compulsoryRank, totalRank: item.totalRank },
          rankType,
          'score'
        ),
      })),
    [rankType, semesters]
  )

  return (
    <View className="relative flex-1">
      {semestersInfo.length ? (
        <AnimatedPagerView
          ref={paperViewRef}
          style={{ height: '100%', width: '100%' }}
          initialPage={0}
          onPageScroll={onPageScroll}
        >
          {semestersInfo.map((semester) => (
            <View
              // PagerView 文档让加的
              collapsable={false}
              key={semester.semesterId}
              className="w-full h-full"
            >
              <ScoreOverviewPage {...semester} />
            </View>
          ))}
        </AnimatedPagerView>
      ) : (
        <Empty text="成绩似乎没了，呜呜呜" />
      )}

      <View className="absolute bottom-4 w-full h-10 flex justify-center">
        <SlidingDot
          testID={'sliding-dot'}
          marginHorizontal={3}
          containerStyle={{ top: 30 }}
          data={semesters}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          scrollX={scrollX}
          dotSize={12}
        />
      </View>
    </View>
  )
}
