import { useHoleList } from '@/swr/hole'
import { RefreshableHoleList } from '../components/HoleList'
import { Page } from '@/components/Page'
import { StatusBar } from 'react-native'
import { useTheme } from 'react-native-paper'
import React from 'react'

export function HoleHot() {
  const query = useHoleList()
  const theme = useTheme()

  return (
    <Page>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <RefreshableHoleList {...query} />
    </Page>
  )
}
