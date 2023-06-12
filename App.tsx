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
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

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
                        <GestureHandlerRootView style={{ flex: 1 }}>
                          <BottomSheetModalProvider>
                            <Layout />
                          </BottomSheetModalProvider>
                        </GestureHandlerRootView>
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
