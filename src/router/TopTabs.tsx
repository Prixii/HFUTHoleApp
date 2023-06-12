import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { HolePost } from '@/pages/hole/post/post'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HoleSearchHeader } from '@/pages/hole/search/header'
import { HoleSearch } from '@/pages/hole/search/search'
import { HoleSearchResult } from '@/pages/hole/search/result/result'
import { HoleDetailHeader } from '@/pages/hole/detail/DetailHeader'
import { HoleDetail } from '@/pages/hole/detail/detail'
import { HoleReply } from '@/pages/hole/detail/reply/HoleReply'
import { HoleHot } from '@/pages/hole/hot/HoleHot'
import { TopTabBar } from '@/components/router/TopTabBar'
import { HoleLatest } from '@/pages/hole/latest/HoleLatest'
import { StatusBar } from 'react-native'
import { useTheme } from 'react-native-paper'
import { TabBar } from 'react-native-tab-view'
import { ScreenWidth } from '@/shared/utils/utils'
import { HoleDetailCommentContextProvider } from '@/shared/context/hole_detail'

const Tab = createMaterialTopTabNavigator()
const HoleStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()

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
      initialRouteName={'index'}
      screenOptions={{ headerShown: false }}
    >
      <HoleStack.Screen name={'index'} component={HoleDetail} />
      <HoleStack.Screen name={'reply'} component={HoleReply} />
    </HoleStack.Navigator>
  )
}

export const HoleNestedStacks = () => {
  return (
    <HoleDetailCommentContextProvider>
      <HoleStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <HoleStack.Screen name={'post'} component={HolePost} />
        <HoleStack.Screen name={'search'} component={HoleSearchStacks} />
        <HoleStack.Screen name={'detail'} component={HoleDetailStacks} />
      </HoleStack.Navigator>
    </HoleDetailCommentContextProvider>
  )
}

const TabScreens = [
  { name: 'latest', component: HoleLatest, title: '最新' },
  { name: 'hot', component: HoleHot, title: '热门' },
]

export function TopTabs() {
  const theme = useTheme()

  return (
    <>
      <StatusBar backgroundColor={theme.colors.background} />
      <Tab.Navigator
        initialRouteName={'latest'}
        tabBar={(props) => <TopTabBar {...props} />}
      >
        {TabScreens.map((item) => (
          <Tab.Screen
            name={item.name}
            component={item.component}
            options={{ title: item.title }}
          />
        ))}
      </Tab.Navigator>
    </>
  )
}
