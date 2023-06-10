import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WebViewPage } from '@/pages/web-view'
import { Register } from '@/pages/auth/register'
import { Login } from '@/pages/auth/login'
import { Forget } from '@/pages/auth/forget'
import { useAuth } from '@/shared/hooks/useAuth'
import { BottomTabs } from '@/router/BottomTabs'
import { HoleNestedStacks } from '@/router/TopTabs'

const Stack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()
const IndexStack = createNativeStackNavigator()

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

export function IndexStacks() {
  return (
    <IndexStack.Navigator screenOptions={{ headerShown: false }}>
      <IndexStack.Screen name={'index'} component={BottomTabs} />
      <IndexStack.Screen name={'hole'} component={HoleNestedStacks} />
    </IndexStack.Navigator>
  )
}

export const Routes = () => {
  const { isLogin } = useAuth()

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <>
            <Stack.Screen name={'index'} component={IndexStacks} />
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
    </>
  )
}
