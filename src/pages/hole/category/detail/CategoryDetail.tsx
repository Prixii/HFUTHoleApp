import { useHoleCategoryList } from '@/swr/hole/category'
import { LoadingScreen } from '@/components/LoadingScreen'
import { CategoryDetailHeader } from '@/pages/hole/category/detail/CategoryDetailHeader'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { CategoryDetailList } from '@/pages/hole/category/detail/CategoryDetailList'

import { Tabs } from 'react-native-collapsible-tab-view'

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

  // TODO

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
