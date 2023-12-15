import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import React from 'react'
import { RefreshableHoleList } from '../components/HoleList'
import { TopCategories } from '@/pages/hole/latest/TopCategories'

export function HoleLatest() {
  const query = useHoleList()

  return (
    <Page>
      <RefreshableHoleList {...query} ListHeaderComponent={TopCategories} />
    </Page>
  )
}
