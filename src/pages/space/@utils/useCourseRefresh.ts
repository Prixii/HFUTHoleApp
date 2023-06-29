import { useCallback, useState } from 'react'
import { useSpaceCourse } from '@/swr/space/course'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'

export const useCourseRefresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { refetch } = useSpaceCourse()
  const { isLogin } = useAuth()

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await refetch(true)
    setIsRefreshing(false)
  }, [refetch])

  return {
    isRefreshing,
    onRefresh,
    enabled: isLogin,
  }
}
