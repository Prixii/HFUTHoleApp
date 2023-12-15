import { Routes } from '@/router/routes'
import { StatusBar, View } from 'react-native'
import Toast from 'react-native-toast-message'
import React, { ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'

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

export const PageWithSafeArea = (props: {
  children: ReactNode
  topStyle?: string
  bottomStyle?: string
}) => {
  return props.children
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
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View className={'flex-1 bg-black'}>
        <Routes />
        <Toast />
      </View>
    </>
  )
}
