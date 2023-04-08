import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WebViewPage } from '@/pages/web-view'
import { Register } from '@/pages/auth/register'
import { Login } from '@/pages/auth/login'
import { Forget } from '@/pages/auth/forget'
import { Hole } from '@/pages/hole/hole'
import { observer } from 'mobx-react-lite'
import { useAuthStore } from '@/store/auth'
import { HolePost } from '@/pages/hole/post/post'
import { HoleDetail } from '@/pages/hole/detail/detail'
import { HoleSearch } from '@/pages/hole/search/search'
import { HoleSearchResult } from '@/pages/hole/search/result/result'
import { View } from 'react-native'
import { HoleSearchHeader } from '@/pages/hole/search/header'
import { HoleDetailHeader } from '@/pages/hole/detail/DetailHeader'
import { HoleHeader } from '@/pages/hole/header'
// import { createDrawerNavigator } from '@react-navigation/drawer'

const Stack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()
const HoleStack = createNativeStackNavigator()

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
}

const Auth = observer(() => {
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
})

const HoleSearchStacks = () => {
  return (
    <HoleStack.Navigator
      screenOptions={{
        header: () => (
          <View className={'px-2'}>
            <HoleSearchHeader />
          </View>
        ),
      }}
    >
      <HoleStack.Screen name={'index'} component={HoleSearch} />
      <HoleStack.Screen name={'result'} component={HoleSearchResult} />
    </HoleStack.Navigator>
  )
}

const HoleStacks = observer(() => {
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
      <HoleStack.Screen
        options={{
          headerShown: true,
          header: () => <HoleDetailHeader />,
        }}
        name={'detail'}
        component={HoleDetail}
      />
      <HoleStack.Screen name={'search'} component={HoleSearchStacks} />
    </HoleStack.Navigator>
  )
})

export const Routes = observer(() => {
  const store = useAuthStore()

  return (
    <Stack.Navigator>
      {store.isLogin ? (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name={'hole'}
            component={HoleStacks}
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
})
