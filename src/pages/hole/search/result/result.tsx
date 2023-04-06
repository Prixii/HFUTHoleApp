import { useHoleSearchResult } from '@/swr/hole'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'

export interface ISearchResultParams {
  keywords: string
}

export function HoleSearchResult() {
  const query = useHoleSearchResult()

  return <RefreshableHoleList {...query} />
}
