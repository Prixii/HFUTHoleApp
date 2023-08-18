import { useHoleList } from '@/swr/hole'
import { RefreshableHoleList } from '../components/HoleList'
import { Page } from '@/components/Page'

export function HoleHot() {
  const query = useHoleList()

  return (
    <Page>
      <RefreshableHoleList {...query} />
    </Page>
  )
}
