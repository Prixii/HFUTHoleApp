import { HolePostBody } from '@/pages/hole/post/body'
import { HolePostContextProvider } from '@/shared/context/hole'
import { HolePostHeader } from '@/pages/hole/post/header'
import { Page } from '@/components/Page'

export function HolePost() {
  return (
    <HolePostContextProvider>
      <Page>
        <HolePostHeader />
        <HolePostBody />
      </Page>
    </HolePostContextProvider>
  )
}
