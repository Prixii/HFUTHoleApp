import { useHoleList } from '@/swr/hole'
import { Page } from '@/components/Page'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { HomeCategories } from '@/pages/hole/Category'

export function HoleLatest() {
  const query = useHoleList()

  return (
    <Page>
      <RefreshableHoleList {...query} ListHeaderComponent={HomeCategories} />
    </Page>
  )
}
