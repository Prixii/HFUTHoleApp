import React, { ReactNode } from 'react'
import { Provider } from 'react-native-paper'
import { colors } from '@/shared/theme/colors'

export const PaperProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Provider
      theme={{
        colors,
        version: 3,
      }}
    >
      {children}
    </Provider>
  )
}
