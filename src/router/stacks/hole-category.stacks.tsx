import { HoleStack } from '@/router/stacks/hole-nested.stacks'
import { CategoryDetailScreen } from '@/pages/hole/category/detail/CategoryDetail'

export function HoleCategoryStacks() {
  return (
    <HoleStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HoleStack.Screen name={'detail'} component={CategoryDetailScreen} />
    </HoleStack.Navigator>
  )
}
