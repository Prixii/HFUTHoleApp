import { useHoleCategoryList } from '@/swr/hole/category'
import { LoadingScreen } from '@/components/LoadingScreen'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { CategoryDetailHeader } from '@/pages/hole/category/detail/CategoryDetailHeader'
import { ITabViewTabs, TabView, TabViewBar } from '@/components/TabView'
import { useMemo, useRef } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { StatusBar, View } from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'

export function CategoryDetailScreen() {
  const { category, ...query } = useHoleCategoryList()
  const offsetY = useSharedValue(0)

  const headerTransformStyle = useAnimatedStyle(() => {
    console.log(offsetY)
    return {
      transform: [{ translateY: -offsetY.value }],
    }
  })

  console.log(StatusBar.currentHeight)
  return (
    <LoadingScreen isLoading={query.isLoading}>
      {/*<Animated.View style={[headerTransformStyle]}>*/}
      {/*  <CategoryDetailHeader />*/}
      {/*</Animated.View>*/}
      {/*<TabView*/}
      {/*  tabs={tabs}*/}
      {/*  renderTabBar={(props) => {*/}
      {/*    return (*/}
      {/*      <Animated.View style={[headerTransformStyle]}>*/}
      {/*        <TabViewBar {...props} />*/}
      {/*      </Animated.View>*/}
      {/*    )*/}
      {/*  }}*/}
      {/*/>*/}
      <Tabs.Container
        renderHeader={CategoryDetailHeader}
        minHeaderHeight={StatusBar.currentHeight} // optional
      >
        {category!.children.map((item) => (
          <Tabs.Tab name={item} key={item}>
            <RefreshableHoleList {...query} FlatListComponent={Tabs.FlatList} />
          </Tabs.Tab>
        ))}
      </Tabs.Container>
    </LoadingScreen>
  )
}
