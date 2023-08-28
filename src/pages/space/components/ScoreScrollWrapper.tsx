import { ScreenWrapper } from '@/components/ScrollWrapper'
import { RefreshIndicatorControl } from '@/components/RefreshIndicatorControl'
import { useSpaceScore } from '@/swr/space/score'
import { PropsWithChildren, FC } from 'react'
import { useSpaceAuth } from '@/pages/space/@utils/useSpaceAuth'

export const ScoreScrollWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { refetch, isFetching } = useSpaceScore()
  const { isLogin } = useSpaceAuth()

  return (
    <ScreenWrapper
      refreshControl={
        <RefreshIndicatorControl
          enabled={isLogin}
          refreshing={isFetching}
          onRefresh={refetch}
        />
      }
    >
      {children}
    </ScreenWrapper>
  )
}
