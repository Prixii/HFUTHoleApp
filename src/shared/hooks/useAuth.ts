import { useLinkTo } from '@react-navigation/native'
import {
  logout as storeLogout,
  login as storeLogin,
} from '@/store/reducer/user'
import { useAppDispatch, useAppSelector } from '@/store/store'

export function useAuth() {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state) => state.user.isLogin)
  const linkTo = useLinkTo()

  const logout = () => {
    dispatch(storeLogout())
    linkTo('/auth')
  }

  const login = (token: string) => {
    dispatch(storeLogin(token))
  }

  return {
    logout,
    login,
    isLogin,
  }
}
