import { Routes } from '@/router/routes'
import { StatusBar, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useTheme } from 'react-native-paper'

export function Layout() {
  const theme = useTheme()

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={'dark-content'}
      />
      <View className={'w-screen min-h-[100vh]'}>
        <Routes />
        <Toast />
      </View>
    </>
  )
}
