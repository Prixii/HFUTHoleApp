import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WebViewPage } from '@/pages/web-view'
import { Register } from '@/pages/auth/register'
import { Login } from '@/pages/auth/login'
import { Home } from '@/pages/home/home'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Stack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

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
    <AuthStack.Navigator>
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

function HomeStacks() {
  return (
    <Drawer.Navigator initialRouteName={'home/index'}>
      <Drawer.Screen
        name={'home/index'}
        component={Home}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}

export const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={'auth'}
        component={Auth}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'home'}
        component={HomeStacks}
      />
      <Stack.Screen name={'web-view'} component={WebViewPage} />
    </Stack.Navigator>
  )
}
