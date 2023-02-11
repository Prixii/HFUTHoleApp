import React, { ReactNode } from 'react'
import { Provider } from 'react-native-paper'

export const PaperProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Provider
      theme={{
        version: 2,
      }}
    >
      {children}
    </Provider>
  )
}
