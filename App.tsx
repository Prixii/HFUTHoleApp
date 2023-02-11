import * as React from 'react'
import { Layout } from './src/layouts/layout'
import { PaperProvider } from './src/shared/providers/paper'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App
