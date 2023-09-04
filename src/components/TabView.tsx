import React, { useMemo, useState } from 'react'
import { useWindowDimensions, View } from 'react-native'
import {
  TabView as NativeTabView,
  SceneMap,
  type Route,
  type TabViewProps as NativeTabViewProps,
  TabBar,
} from 'react-native-tab-view'
import { useTheme } from 'react-native-paper'
import type { Props as RNTabViewProps } from 'react-native-tab-view/lib/typescript/src/TabBar'

export interface ITabViewTabs extends Route {
  // 这里 component 写成 ReactNode 会报错，好奇怪
  component?: any
}

interface TabViewProps extends Partial<NativeTabViewProps<Route>> {
  tabs: ITabViewTabs[]
}

export const TabView = ({ tabs, ...props }: TabViewProps) => {
  const [index, setIndex] = useState(0)

  const renderScene = useMemo(
    () =>
      SceneMap(Object.fromEntries(tabs.map((tab) => [tab.key, tab.component]))),
    [tabs]
  )

  return (
    <NativeTabView
      navigationState={{ index, routes: tabs }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      {...props}
    />
  )
}

export function TabViewBar(props: RNTabViewProps<any>) {
  const theme = useTheme()

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
      scrollEnabled={true}
      bounces={true}
    />
  )
}
