import { useAuthStore } from '@/store/auth'
import { useLinkTo } from '@react-navigation/native'

export function useAuth() {
  const store = useAuthStore()
  const linkTo = useLinkTo()

  const logout = () => {
    store.logout()
    linkTo('/auth')
  }

  return {
    logout,
  }
}
