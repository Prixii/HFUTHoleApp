import { useCallback, useMemo, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useTheme } from 'react-native-paper'
import { TabView, SceneMap, TabBar, Route } from 'react-native-tab-view'
import { TopTabBar } from '@/components/router/TopTabBar'

// 这里 component 写成 ReactNode 会报错，好奇怪
export type Tab = Route & { component: any }

export const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  const layout = useWindowDimensions()
  const theme = useTheme()

  const [index, setIndex] = useState(0)

  const renderScene = useMemo(
    () =>
      SceneMap(Object.fromEntries(tabs.map((tab) => [tab.key, tab.component]))),
    [tabs]
  )

  const renderTabBar = useCallback(
    (props) => {
      return (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: theme.colors.primary }}
          inactiveColor={theme.colors.surfaceVariant}
          activeColor={theme.colors.primary}
          style={{
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
            shadowColor: 'white',
          }}
        />
      )
    },
    [theme.colors]
  )

  return (
    <TabView
      navigationState={{ index, routes: tabs }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  )
}
