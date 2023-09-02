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

const INTRO_DATA = [
  {
    key: '1',
    title: 'App showcase ✨',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    key: '2',
    title: 'Introduction screen 🎉',
    description:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
  },
  {
    key: '3',
    title: 'And can be anything 🎈',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ',
  },
  {
    key: '4',
    title: 'And can be anything 🎈',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ',
  },
]

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

export const ScoreOverview = () => {
  const { semesters, rankType } = useAppSelector((state) => state.spaceScore)
  const width = Dimensions.get('window').width
  const ref = useRef<PagerView>(null)
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current
  const positionAnimatedValue = useRef(new Animated.Value(0)).current
  const inputRange = [0, INTRO_DATA.length]
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, INTRO_DATA.length * width],
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
          ref={ref}
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
          data={INTRO_DATA}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          scrollX={scrollX}
          dotSize={12}
        />
      </View>
    </View>
  )
}
