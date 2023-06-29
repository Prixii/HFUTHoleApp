import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WebViewPage } from '@/pages/web-view'
import { Register } from '@/pages/auth/register'
import { Login } from '@/pages/auth/login'
import { Forget } from '@/pages/auth/forget'
import { useAuth } from '@/shared/hooks/useAuth'
import { BottomTabs, UserStacks } from '@/router/BottomTabs'
import { HoleNestedStacks } from '@/router/TopTabs'
import { AuthStacks } from '@/router/stacks/auth.stack'
import { IndexStacks } from '@/router/stacks/index.stack'

const Stack = createNativeStackNavigator()

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
            component={AuthStacks}
          />
        )}
      </Stack.Navigator>
    </>
  )
}
