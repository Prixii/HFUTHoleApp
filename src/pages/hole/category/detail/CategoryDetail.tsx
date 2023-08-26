import { useHoleCategoryList } from '@/swr/hole/category'
import { LoadingScreen } from '@/components/LoadingScreen'
import { CategoryDetailHeader } from '@/pages/hole/category/detail/CategoryDetailHeader'
import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { CategoryDetailList } from '@/pages/hole/category/detail/CategoryDetailList'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { ITabViewTabs, TabView, TabViewBar } from '@/components/TabView'

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

  const [headerHeight, setHeaderHeight] = useState(265)
  const scrollY = useSharedValue(0)
  const headerContentStyle = useAnimatedStyle(() => {
    return {
      translateY: -scrollY.value,
    }
  })
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  const tabs = useMemo<ITabViewTabs[]>(
    () => [
      ...category.children.map((item) => ({
        key: item,
        title: item,
        component: () => (
          <View className={'overflow-visible'}>
            <CategoryDetailList
              ListHeaderComponent={
                <View
                  style={{
                    height: headerHeight,
                  }}
                />
              }
              subClassification={item}
              onScroll={scrollHandler}
              showsVerticalScrollIndicator={false}
              enabled={true}
            />
          </View>
        ),
      })),
    ],
    [activeClassification, category.children, headerHeight, scrollHandler]
  )

  return (
    <LoadingScreen isLoading={isLoading}>
      <TabView
        tabs={tabs}
        onIndexChange={(index) => {
          setActiveClassification(tabs[index].title!)
        }}
        renderTabBar={(props) => (
          <Animated.View
            className={'absolute'}
            style={headerContentStyle}
            onLayout={(event) => {
              setHeaderHeight(event.nativeEvent.layout.height)
            }}
          >
            <CategoryDetailHeader />
            <TabViewBar {...props} />
          </Animated.View>
        )}
      />
    </LoadingScreen>
  )
}
