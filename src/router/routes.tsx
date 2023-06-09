import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WebViewPage } from '@/pages/web-view'
import { Register } from '@/pages/auth/register'
import { Login } from '@/pages/auth/login'
import { Forget } from '@/pages/auth/forget'
import { useAuth } from '@/shared/hooks/useAuth'
import { BottomTabs } from '@/router/bottomTabs'

const Stack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()

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

export const Routes = () => {
  const { isLogin } = useAuth()

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <>
            <Stack.Screen name={'index'} component={BottomTabs} />
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
