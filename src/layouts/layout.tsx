import { Routes } from '@/router/routes'
import { StatusBar, View } from 'react-native'
import Toast from 'react-native-toast-message'

export function Layout() {
  return (
    <>
      <StatusBar />
      <View className={'w-screen min-h-[100vh] px-2'}>
        <Routes />
        <Toast />
      </View>
    </>
  )
}
