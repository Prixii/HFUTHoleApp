import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LikeIcon } from '@/components/icon'
import { BottomTabBar } from '@/components/router/bottomTabs'
import { Notify } from '@/pages/notify/Notify'
import { TopTabs } from '@/router/TopTabs'
import { SpaceTopTabs } from '@/router/SpaceTopTabs'
import { User } from '@/pages/user/User'
import { ProfileScreen } from '@/pages/user/profile/ProfileScreen'
import { useBaseNotificationsQuery } from '@/swr/notify/useBaseNotifications'

const Tab = createBottomTabNavigator()
const NotifyStack = createNativeStackNavigator()
const UserStack = createNativeStackNavigator()

const NotifyStacks = () => {
  return (
    <NotifyStack.Navigator screenOptions={{ headerShown: false }}>
      <NotifyStack.Screen name={'index'} component={Notify} />
    </NotifyStack.Navigator>
  )
}

export const UserStacks = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name={'profile'} component={ProfileScreen} />
    </UserStack.Navigator>
  )
}

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarIcon: () => <LikeIcon size={20} />,
      })}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name={'home'} component={TopTabs} />
      <Tab.Screen name={'space'} component={SpaceTopTabs} />
      <Tab.Screen name={'notify'} component={NotifyStacks} />
      <Tab.Screen name={'user'} component={User} />
    </Tab.Navigator>
  )
}
