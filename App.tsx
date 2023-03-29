import * as React from 'react'
import { Layout } from '@/layouts/layout'
import { PaperProvider } from '@/shared/providers/paper'
import { NavigationContainer } from '@react-navigation/native'
import { ReactQueryProvider } from '@/shared/providers/react-query'
import { setupGlobalConfig } from '@/shared/config'
import { NativeBaseProvider } from 'native-base'

setupGlobalConfig()

const App = () => {
  return (
    <ReactQueryProvider>
      <PaperProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            <Layout />
          </NativeBaseProvider>
        </NavigationContainer>
      </PaperProvider>
    </ReactQueryProvider>
  )
}

export default App
