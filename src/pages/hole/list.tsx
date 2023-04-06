import { useHoleList } from '@/swr/hole'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'

export function HoleList() {
  const query = useHoleList()

  return <RefreshableHoleList {...query} />
}
