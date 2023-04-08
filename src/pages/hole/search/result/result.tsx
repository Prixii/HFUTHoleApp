import { useHoleSearchResult } from '@/swr/hole'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { View } from 'react-native'

export interface ISearchResultParams {
  keywords: string
}

export function HoleSearchResult() {
  const query = useHoleSearchResult()

  return (
    <View className={'px-2'}>
      <RefreshableHoleList {...query} />
    </View>
  )
}
