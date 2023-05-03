import { useUserFavoriteHoleList } from '@/swr/user/hole'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'
import { Page } from '@/components/Page'

export function UserFavoriteHole() {
  const query = useUserFavoriteHoleList()

  return (
    <Page>
      <RefreshableHoleList {...query} />
    </Page>
  )
}
