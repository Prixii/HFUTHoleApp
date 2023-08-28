import { useHoleCategoryList } from '@/swr/hole/category'
import { LoadingScreen } from '@/components/LoadingScreen'
import { CategoryDetailHeader } from '@/pages/hole/category/detail/CategoryDetailHeader'
import React, { useMemo, useState } from 'react'
import { ScrollView, StatusBar, View } from 'react-native'
import { CategoryDetailList } from '@/pages/hole/category/detail/CategoryDetailList'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { ITabViewTabs, TabView, TabViewBar } from '@/components/TabView'
import { Tabs } from 'react-native-collapsible-tab-view'
import { Text, TouchableRipple } from 'react-native-paper'
import { Indicator, TabBar } from '@/pages/hole/category/components/Indicator'

/**
 * TODO
 * 解决enabled
 * 解决tab吸顶
 * 做好看一点
 */
export function CategoryDetailScreen() {
  const { category, isLoading, name, subName } = useHoleCategoryList()
  const [activeClassification, setActiveClassification] = useState<string>(
    subName || category.children[0]
  )

  return (
    <LoadingScreen isLoading={isLoading}>
      <Tabs.Container
        renderHeader={CategoryDetailHeader}
        minHeaderHeight={StatusBar.currentHeight}
        onTabChange={(tab) => setActiveClassification(tab.tabName)}
        initialTabName={subName}
      >
        {category!.children.map((item) => (
          <Tabs.Tab name={item} key={item}>
            <CategoryDetailList
              subClassification={item}
              enabled={item === activeClassification}
              FlatListComponent={Tabs.FlatList}
            />
          </Tabs.Tab>
        ))}
      </Tabs.Container>
    </LoadingScreen>
  )
}
