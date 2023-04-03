import { HoleList } from '@/pages/hole/list'
import { HolePostFAB } from '@/pages/hole/PostFab'
import { Page } from '@/components/Page'

export const Hole = () => {
  return (
    <>
      <Page>
        <HoleList />
        <HolePostFAB />
      </Page>
    </>
  )
}
