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
import { StatusBarContextProvider } from '@/shared/context/statusbar'
import { Provider } from 'react-redux'
import { persistor, store } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Updater } from '@/components/Update/Updater'

setupGlobalConfig()

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReactQueryProvider>
          <PaperProvider>
            <Updater>
              <HoleListContextProvider>
                <HolePostContextProvider>
                  <NavigationContainer>
                    <NativeBaseProvider>
                      <StatusBarContextProvider>
                        <Layout />
                      </StatusBarContextProvider>
                    </NativeBaseProvider>
                  </NavigationContainer>
                </HolePostContextProvider>
              </HoleListContextProvider>
            </Updater>
          </PaperProvider>
        </ReactQueryProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
