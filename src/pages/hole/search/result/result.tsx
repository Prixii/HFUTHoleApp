import { useParams } from '@/shared/hooks/useParams'
import { Text, View } from 'react-native'
import { useHoleSearchResult } from '@/swr/hole'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'

export interface ISearchResultParams {
  keywords: string
}

export function HoleSearchResult() {
  const params = useParams<ISearchResultParams>()

  const query = useHoleSearchResult()

  return <RefreshableHoleList {...query} />
}
