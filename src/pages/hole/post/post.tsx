import { HolePostBody } from '@/pages/hole/post/body'
import { HolePostContextProvider } from '@/shared/context/hole'
import { HolePostHeader } from '@/pages/hole/post/header'
import { Page } from '@/components/Page'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useStatusBarContext } from '@/shared/context/statusbar'
import { useState } from 'react'

export function HolePost() {
  const theme = useTheme()

  const { setBackgroundColor } = useStatusBarContext()

  setBackgroundColor()

  return (
    <HolePostContextProvider>
      <View
        className={'h-screen'}
        style={{ backgroundColor: theme.colors.background }}
      >
        <HolePostBody />
      </View>
    </HolePostContextProvider>
  )
}
