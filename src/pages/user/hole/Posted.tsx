import { useUserPostedHoleList } from '@/swr/user/hole'
import { RefreshableHoleList } from '@/pages/hole/components/HoleList'

export function UserPostedHole() {
  const query = useUserPostedHoleList()

  return <RefreshableHoleList {...query} />
}
