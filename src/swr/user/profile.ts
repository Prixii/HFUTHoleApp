import { useQuery } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import { GetUserProfileRequest } from '@/request/apis/user'
import { useMemo } from 'react'

export function useUserProfile() {
  const query = useQuery(SWRKeys.user.profile, () => GetUserProfileRequest())

  const levelPercent = useMemo(() => {
    return (
      query.data?.level.experience ||
      0 / (query.data?.level.nextLevelRequiredExperience || 1)
    )
  }, [query.data?.level])

  return {
    ...query,
    levelPercent,
  }
}
