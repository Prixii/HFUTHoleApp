import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WebViewPage } from '@/pages/web-view'
import { Register } from '@/pages/auth/register'
import { Login } from '@/pages/auth/login'
import { Hole } from '@/pages/hole/hole'
import { observer } from 'mobx-react-lite'
import { useAuthStore } from '@/store/auth'
import { HolePost } from '@/pages/hole/post/post'
import { HoleDetail } from '@/pages/hole/detail/detail'
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

function Auth() {
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
    </AuthStack.Navigator>
  )
}

const HoleStacks = () => {
  return (
    <HoleStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HoleStack.Screen name={'index'} component={Hole} />
      <HoleStack.Screen name={'post'} component={HolePost} />
      <HoleStack.Screen name={'detail'} component={HoleDetail} />
    </HoleStack.Navigator>
  )
}

export const Routes = observer(() => {
  const authStore = useAuthStore()

  return (
    <Stack.Navigator>
      {!authStore.isLogin && (
        <Stack.Screen
          options={{ headerShown: false }}
          name={'auth'}
          component={Auth}
        />
      )}
      <Stack.Screen
        options={{ headerShown: false }}
        name={'hole'}
        component={HoleStacks}
      />
      <Stack.Screen name={'web-view'} component={WebViewPage} />
    </Stack.Navigator>
  )
})
