import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WebViewPage } from '@/pages/web-view'
import { Register } from '@/pages/auth/register'
import { Login } from '@/pages/auth/login'
import { Forget } from '@/pages/auth/forget'
import { Hole } from '@/pages/hole/hole'
import { HolePost } from '@/pages/hole/post/post'
import { HoleDetail } from '@/pages/hole/detail/detail'
import { HoleSearch } from '@/pages/hole/search/search'
import { HoleSearchResult } from '@/pages/hole/search/result/result'
import { HoleSearchHeader } from '@/pages/hole/search/header'
import { HoleDetailHeader } from '@/pages/hole/detail/DetailHeader'
import { HoleHeader } from '@/pages/hole/header'
import { HoleReply } from '@/pages/hole/detail/reply/HoleReply'
import { UserFavoriteHole } from '@/pages/user/hole/Favorite'
import { UserPostedHole } from '@/pages/user/hole/Posted'
import { useAuth } from '@/shared/hooks/useAuth'
// import { createDrawerNavigator } from '@react-navigation/drawer'

const Stack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()
const HoleStack = createNativeStackNavigator()

const Auth = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name={'login'}
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={'register'}
        component={Register}
        options={{ title: '注册' }}
      />
      <AuthStack.Screen
        name={'forget'}
        component={Forget}
        options={{ title: '找回密码' }}
      />
    </AuthStack.Navigator>
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

const HoleStacks = () => {
  return (
    <HoleStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HoleStack.Screen
        options={{
          headerShown: true,
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

const UserStack = createNativeStackNavigator()

export const UserStacks = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        options={{
          headerTitle: '私藏小洞',
        }}
        name={'favorite'}
        component={UserFavoriteHole}
      />
      <UserStack.Screen
        options={{
          headerTitle: '我的树洞',
        }}
        name={'posted'}
        component={UserPostedHole}
      />
    </UserStack.Navigator>
  )
}

export const Routes = () => {
  const { isLogin } = useAuth()

  return (
    <Stack.Navigator>
      {isLogin ? (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name={'hole'}
            component={HoleStacks}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={'user'}
            component={UserStacks}
          />
          <Stack.Screen name={'web-view'} component={WebViewPage} />
        </>
      ) : (
        <Stack.Screen
          options={{ headerShown: false }}
          name={'auth'}
          component={Auth}
        />
      )}
    </Stack.Navigator>
  )
}
