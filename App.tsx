import * as React from 'react'
import { Layout } from '@/layouts/layout'
import { PaperProvider } from '@/shared/providers/paper'
import { NavigationContainer } from '@react-navigation/native'
import { ReactQueryProvider } from '@/shared/providers/react-query'
import { setupGlobalConfig } from '@/shared/config'
import { NativeBaseProvider } from 'native-base'
import {
  HoleListContextProvider,
  HolePostContextProvider,
} from '@/shared/context/hole'

setupGlobalConfig()

const App = () => {
  return (
    <ReactQueryProvider>
      <PaperProvider>
        <HoleListContextProvider>
          <HolePostContextProvider>
            <NavigationContainer>
              <NativeBaseProvider>
                <Layout />
              </NativeBaseProvider>
            </NavigationContainer>
          </HolePostContextProvider>
        </HoleListContextProvider>
      </PaperProvider>
    </ReactQueryProvider>
  )
}

export default App
