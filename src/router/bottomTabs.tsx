import { HoleSearchHeader } from '@/pages/hole/search/header'
import { HoleSearch } from '@/pages/hole/search/search'
import { HoleSearchResult } from '@/pages/hole/search/result/result'
import { HoleDetailHeader } from '@/pages/hole/detail/DetailHeader'
import { HoleDetail } from '@/pages/hole/detail/detail'
import { HoleReply } from '@/pages/hole/detail/reply/HoleReply'
import { HoleHeader } from '@/pages/hole/header'
import { Hole } from '@/pages/hole/hole'
import { HolePost } from '@/pages/hole/post/post'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserFavoriteHole } from '@/pages/user/hole/Favorite'
import { UserPostedHole } from '@/pages/user/hole/Posted'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LikeIcon } from '@/components/icon'
import { Course } from '@/pages/course/Course'
import { BottomTabBar } from '@/components/router/bottomTabs'
import { Notify } from '@/pages/notify/Notify'

const Tab = createBottomTabNavigator()
const HoleStack = createNativeStackNavigator()
const CourseStack = createNativeStackNavigator()
const NotifyStack = createNativeStackNavigator()
const UserStack = createNativeStackNavigator()

const CourseStacks = () => {
  return (
    <CourseStack.Navigator screenOptions={{ headerShown: false }}>
      <CourseStack.Screen name={'index'} component={Course} />
    </CourseStack.Navigator>
  )
}

const NotifyStacks = () => {
  return (
    <NotifyStack.Navigator screenOptions={{ headerShown: false }}>
      <NotifyStack.Screen name={'index'} component={Notify} />
    </NotifyStack.Navigator>
  )
}

const HoleSearchStacks = () => {
  return (
    <HoleStack.Navigator
      screenOptions={{
        header: () => <HoleSearchHeader />,
      }}
    >
      <HoleStack.Screen name={'index'} component={HoleSearch} />
      <HoleStack.Screen name={'result'} component={HoleSearchResult} />
    </HoleStack.Navigator>
  )
}

const HoleDetailStacks = () => {
  return (
    <HoleStack.Navigator
      screenOptions={{
        header: () => <HoleDetailHeader />,
      }}
    >
      <HoleStack.Screen name={'index'} component={HoleDetail} />
      <HoleStack.Screen name={'reply'} component={HoleReply} />
    </HoleStack.Navigator>
  )
}

export const HoleStacks = () => {
  return (
    <HoleStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HoleStack.Screen
        options={{
          headerShown: false,
          header: () => <HoleHeader />,
        }}
        name={'index'}
        component={Hole}
      />
      <HoleStack.Screen name={'post'} component={HolePost} />
      <HoleStack.Screen name={'search'} component={HoleSearchStacks} />
      <HoleStack.Screen name={'detail'} component={HoleDetailStacks} />
    </HoleStack.Navigator>
  )
}

export const UserStacks = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name={'favorite'} component={UserFavoriteHole} />
      <UserStack.Screen name={'posted'} component={UserPostedHole} />
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
      <Tab.Screen name={'hole'} component={HoleStacks} />
      <Tab.Screen name={'course'} component={CourseStacks} />
      <Tab.Screen name={'notify'} component={NotifyStacks} />
      <Tab.Screen name={'user'} component={UserStacks} />
    </Tab.Navigator>
  )
}
