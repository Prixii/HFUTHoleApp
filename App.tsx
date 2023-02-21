import * as React from 'react'
import { Layout } from '@/layouts/layout'
import { PaperProvider } from '@/shared/providers/paper'
import { NavigationContainer } from '@react-navigation/native'
import { ReactQueryProvider } from '@/shared/providers/react-query'

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
