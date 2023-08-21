import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import React, { createRef, useState } from 'react'
import { RefreshableHoleList } from '../components/HoleList'
import { StatusBar } from 'react-native'
import { useTheme } from 'react-native-paper'

export function HoleLatest() {
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
