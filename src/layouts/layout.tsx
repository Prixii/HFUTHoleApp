import { Routes } from '@/router/routes'
import { StatusBar, View } from 'react-native'
import Toast from 'react-native-toast-message'

export function Layout() {
  return (
    <>
      <StatusBar backgroundColor={'#E0E9E0'} barStyle={'dark-content'} />
      <View className={'w-screen min-h-[100vh] bg-[#E0E9E0]'}>
        <Routes />
        <Toast />
      </View>
    </>
  )
}
