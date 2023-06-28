import { useTheme } from 'react-native-paper'
import { StatusBar, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { TopTabBar } from '@/components/router/TopTabBar'
import { DaySchedule } from '@/pages/space/day-schedule/DaySchedule'
import { WeekSchedule } from '@/pages/space/week-schedule/WeekSchedule'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { IconButton } from '@/components/IconButton'
import { LogoutIcon } from '@/components/icon'

const Tab = createMaterialTopTabNavigator()

const TabScreens = [
  { name: 'day', component: DaySchedule, title: '日程' },
  { name: 'week', component: WeekSchedule, title: '课表' },
]

export const SpaceTopTabs = () => {
  const theme = useTheme()
  const { isLogin } = useAuth()

  return (
    <>
      <StatusBar backgroundColor={theme.colors.background} />
      <Tab.Navigator
        initialRouteName={'day'}
        // TODO 防止未登录时跳转路由
        tabBar={(props) => <TopBar {...props} />}
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

const TopBar = (props: MaterialTopTabBarProps) => {
  const { isLogin, logout } = useAuth()

  return (
    <>
      {isLogin ? (
        <View className="flex flex-row justify-between items-center">
          <TopTabBar {...props} />
          <IconButton
            icon={() => <LogoutIcon size={20} />}
            transparent
            onPress={logout}
          />
        </View>
      ) : (
        <View />
      )}
    </>
  )
}
