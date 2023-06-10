import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'

export function HoleHot() {
  const query = useHoleList()

  return (
    <Page>
      <RefreshableHoleList {...query} />
    </Page>
  )
}
