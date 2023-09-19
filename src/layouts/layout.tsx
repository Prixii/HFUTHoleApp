import { Routes } from '@/router/routes'
import { Platform, SafeAreaView, View } from 'react-native'
import Toast from 'react-native-toast-message'
import React, { ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { EmojiCard } from '@/components/EmojiCard/EmojiCard'
import { PopoverCard } from '@/components/PopoverCard/PopoverCard'

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
)

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
)

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
})

/**
 * 对于IOS设备，可能不会检测StatusBar，所以需要渲染安全区
 * @param param0 子组件
 * @param topColor 顶部安全区背景颜色
 * @param bottomColor 底部安全区背景颜色
 * @returns 返回子组件
 */

export const PageWithSafeArea = (prop: {
  children: ReactNode
  topStyle?: string
  bottomStyle?: string
}) => {
  const isIOS = Platform.OS === 'ios'
  if (isIOS) {
    const topAreaClassName = 'flex-0 ' + (prop.topStyle ?? 'bg-background')
    const bottomAreaClassName = 'flex-1 ' + (prop.bottomStyle ?? 'bg-white')
    return (
      <>
        <SafeAreaView className={topAreaClassName} />
        <SafeAreaView className={bottomAreaClassName}>
          {prop.children}
        </SafeAreaView>
      </>
    )
  } else {
    return prop.children
  }
}

export function TabViewExample() {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

export function Layout() {
  return (
    <>
      <View className={'w-screen min-h-[100vh]'}>
        <Routes />
        <Toast />
      </View>
    </>
  )
}
