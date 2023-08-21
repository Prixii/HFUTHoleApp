import { Routes } from '@/router/routes'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import React from 'react'
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
