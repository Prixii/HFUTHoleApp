import { Login } from '@/pages/auth/login'
import { Register } from '@/pages/auth/register'
import { Forget } from '@/pages/auth/forget'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AuthStack = createNativeStackNavigator()

export const AuthStacks = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: '#fff',
        statusBarStyle: 'dark',
      }}
    >
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
