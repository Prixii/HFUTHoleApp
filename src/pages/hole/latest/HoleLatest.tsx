import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import React, { createRef, useState } from 'react'
import { RefreshableHoleList } from '../components/HoleList'

export function HoleLatest() {
  const query = useHoleList()

  return (
    <Page>
      <RefreshableHoleList {...query} />
    </Page>
  )
}
