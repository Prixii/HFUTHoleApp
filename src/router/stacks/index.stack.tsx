import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BottomTabs, UserStacks } from '@/router/BottomTabs'
import { HoleNestedStacks } from '@/router/TopTabs'

const IndexStack = createNativeStackNavigator()

export function IndexStacks() {
  return (
    <IndexStack.Navigator screenOptions={{ headerShown: false }}>
      <IndexStack.Screen name={'index'} component={BottomTabs} />
      <IndexStack.Screen name={'hole'} component={HoleNestedStacks} />
      {/* TODO 这里的 Screen name 与 BottomTabs 下的 user 重名了，导致无法跳转。想不到好的名字 */}
      <IndexStack.Screen name={'User'} component={UserStacks} />
    </IndexStack.Navigator>
  )
}
