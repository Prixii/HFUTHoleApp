import { useQuery } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import { GetUserProfileRequest } from '@/request/apis/user'

export function useUserProfile() {
  return useQuery(SWRKeys.user.profile, () => GetUserProfileRequest())
}
