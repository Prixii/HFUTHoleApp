import * as React from 'react'
import { Layout } from '@/layouts/layout'
import { PaperProvider } from '@/shared/providers/paper'
import { NavigationContainer } from '@react-navigation/native'
import { ReactQueryProvider } from '@/shared/providers/react-query'
import { configurePersistable } from 'mobx-persist-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

configurePersistable({
  storage: AsyncStorage,
})

const App = () => {
  return (
    <ReactQueryProvider>
      <PaperProvider>
        <NavigationContainer>
          <Layout />
        </NavigationContainer>
      </PaperProvider>
    </ReactQueryProvider>
  )
}

export default App
