import { useTheme } from 'react-native-paper'
import { StatusBar } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { TopTabBar } from '@/components/router/TopTabBar'
import { DaySchedule } from '@/pages/course/day-schedule/DaySchedule'
import { WeekSchedule } from '@/pages/course/week-schedule/WeekSchedule'

const Tab = createMaterialTopTabNavigator()

const TabScreens = [
  { name: 'day', component: DaySchedule, title: '日程' },
  { name: 'week', component: WeekSchedule, title: '课表' },
]

export const CourseTopTabs = () => {
  const theme = useTheme()
  return (
    <>
      <StatusBar backgroundColor={theme.colors.background} />
      <Tab.Navigator
        initialRouteName={'day'}
        tabBar={(props) => <TopTabBar {...props} />}
        screenOptions={{
          swipeEnabled: false,
        }}
      >
        {TabScreens.map((item) => (
          <Tab.Screen
            name={item.name}
            component={item.component}
            options={{ title: item.title }}
            key={item.name}
          />
        ))}
      </Tab.Navigator>
    </>
  )
}
