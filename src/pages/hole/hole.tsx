import { HoleList } from '@/pages/hole/list'
import { HolePostFAB } from '@/pages/hole/PostFab'
import { Page } from '@/components/Page'
import { HoleListContextProvider } from '@/shared/context/hole'

export const Hole = () => {
  return (
    <HoleListContextProvider>
      <Page>
        <HoleList />
        <HolePostFAB />
      </Page>
    </HoleListContextProvider>
  )
}
