import { ScrollView, View } from 'react-native'
import { HoleList } from '@/pages/hole/list'
import { HolePostFAB } from '@/pages/hole/PostFab'
import { HoleHeader, SelectListHoleListMode } from '@/pages/hole/header'
import { Page } from '@/components/Page'
import { HoleListContextProvider } from '@/shared/context/hole'
import React from 'react'

export const Hole = () => {
  return (
    <HoleListContextProvider>
      <Page>
        <HoleList />
        <HolePostFAB />
      </Page>
    </HoleListContextProvider>
  )
}
