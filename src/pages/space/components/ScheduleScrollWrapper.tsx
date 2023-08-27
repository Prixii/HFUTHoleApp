import {
  ScreenWrapper,
  type ScreenWrapperProps,
} from '@/components/ScrollWrapper'
import { RefreshIndicatorControl } from '@/components/RefreshIndicatorControl'
import { FC } from 'react'
import { useSpaceCourse } from '@/swr/space/course'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'

export const ScheduleScrollWrapper: FC<ScreenWrapperProps> = ({
  children,
  ...props
}) => {
  const { isFetching, refetch } = useSpaceCourse()
  const { isLogin } = useAuth()

  return (
    <ScreenWrapper
      {...props}
      contentContainerStyle={{
        minHeight: '100%',
      }}
      refreshControl={
        <RefreshIndicatorControl
          refreshing={isFetching}
          enabled={isLogin}
          onRefresh={refetch}
        />
      }
    >
      {children}
    </ScreenWrapper>
  )
}
