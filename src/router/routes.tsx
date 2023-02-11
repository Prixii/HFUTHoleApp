import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '@/pages/auth/login'

const Stack = createNativeStackNavigator()

export const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={'login'}
        component={Login}
      />
    </Stack.Navigator>
  )
}
