import { ScreenWrapper } from '@/components/ScrollWrapper'
import { RefreshIndicatorControl } from '@/components/RefreshIndicatorControl'
import { PropsWithChildren, FC } from 'react'
import { useSpaceCourse } from '@/swr/space/course'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'

export const ScheduleScrollWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { isRefetching, refetch } = useSpaceCourse()
  const { isLogin } = useAuth()

  return (
    <ScreenWrapper
      contentContainerStyle={{
        minHeight: '100%',
      }}
      refreshControl={
        <RefreshIndicatorControl
          refreshing={isRefetching}
          enabled={isLogin}
          onRefresh={refetch}
        />
      }
    >
      {children}
    </ScreenWrapper>
  )
}
