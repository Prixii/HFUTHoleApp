import { Routes } from '@/router/routes'
import { StatusBar, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useStatusBarContext } from '@/shared/context/statusbar'

export function Layout() {
  const { color, barStyle } = useStatusBarContext()

  return (
    <>
      <StatusBar backgroundColor={color} barStyle={barStyle} />
      <View className={'w-screen min-h-[100vh]'}>
        <Routes />
        <Toast />
      </View>
    </>
  )
}
