import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import React from 'react'
import { RefreshableHoleList } from '../components/HoleList'
import { TopCategories } from '@/pages/hole/latest/TopCategories'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'

export function HoleLatest() {
  const query = useHoleList()

  return (
    <View className={'px-2'}>
      <RefreshableHoleList {...query} ListHeaderComponent={TopCategories} />
    </View>
  )
}
