import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BottomTabs, UserStacks } from '@/router/BottomTabs'
import { HoleNestedStacks } from '@/router/TopTabs'

const IndexStack = createNativeStackNavigator()

export function IndexStacks() {
  return (
    <IndexStack.Navigator screenOptions={{ headerShown: false }}>
      <IndexStack.Screen name={'index'} component={BottomTabs} />
      <IndexStack.Screen name={'hole'} component={HoleNestedStacks} />
      <IndexStack.Screen name={'user'} component={UserStacks} />
    </IndexStack.Navigator>
  )
}
