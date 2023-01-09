import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Provider } from 'react-native-paper'
import MyComponent from './src/layouts/MainLayout'
import { useRoutes } from 'react-router'
import { NativeRouter } from 'react-router-native'
import { Hole } from './src/pages/hole/Hole'

const Layout = () => {
  return useRoutes([
    {
      path: '/',
      element: <MyComponent />,
    },
    {
      path: '/app',
      element: <Hole />,
    },
  ])
}

export default function App() {
  return (
    <Provider>
      <NativeRouter>
        <Layout />
      </NativeRouter>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
