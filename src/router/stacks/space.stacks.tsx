import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScoreOverview } from '@/pages/space/score/score-overview/ScoreOverview'
import { ScoreInfo } from '@/pages/space/score/score-info/ScoreInfo'
import { FailureRate } from '@/pages/space/score/failure-rate/FailureRate'
import { CustomRanking } from '@/pages/space/score/custom-ranking/CustomRanking'
import { ScoreHelpScreen } from '@/pages/space/service/help/Help'
import { Header } from '@/components/Header'
import { SpaceClassmateScreen } from '@/pages/space/service/classmate/SpaceClassmateScreen'
import { CourseFailureQuery } from '@/pages/space/service/course-failure/CourseFailureQuery'
import { CourseFailureSearch } from '@/pages/space/service/course-failure-search/CourseFailureSearch'
import { Exam } from '@/pages/space/service/exam/ExamScreen'
import type { Screen } from './user.stacks'

const SpaceStack = createNativeStackNavigator()

const ScoreScreens: Screen[] = [
  {
    name: 'score-overview',
    component: ScoreOverview,
    options: {
      title: '成绩预览',
    },
  },
  {
    name: 'score-info',
    component: ScoreInfo,
    options: {
      title: '成绩信息',
    },
  },
  {
    name: 'failure-rate',
    component: FailureRate,
    options: {
      title: '挂科率查询',
    },
  },
  {
    name: 'custom-ranking',
    component: CustomRanking,
    options: {
      title: '自定义排名',
    },
  },
  {
    name: 'help',
    component: ScoreHelpScreen,
    options: {
      title: '成绩帮助',
    },
  },
  {
    name: 'classmate',
    component: SpaceClassmateScreen,
    options: {
      title: '同班同学',
    },
  },
  {
    name: 'course-failure-query',
    component: CourseFailureQuery,
    options: {
      title: '课程挂科率查询',
    },
  },
  {
    name: 'course-failure-search-query',
    component: CourseFailureSearch,
    options: {
      title: '课程挂科率查询',
    },
  },
  {
    name: 'exam',
    component: Exam,
    options: {
      title: '最近考试',
    },
  },
]

export const SpaceStacks = () => {
  return (
    <>
      <SpaceStack.Navigator screenOptions={{ header: Header }}>
        {ScoreScreens.map((screen) => (
          <SpaceStack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              statusBarColor: '#fff',
              statusBarStyle: 'dark',
              ...screen.options,
            }}
          />
        ))}
      </SpaceStack.Navigator>
    </>
  )
}
