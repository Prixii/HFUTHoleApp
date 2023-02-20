import { Routes } from '@/router/routes'
import { StatusBar, View } from 'react-native'
import { FAB } from 'react-native-paper'

export function Layout() {
  return (
    <>
      <StatusBar />
      <Routes />
    </>
  )
}
