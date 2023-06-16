import {
  logout as storeLogout,
  login as storeLogin,
} from '@/store/reducer/spaceUser'
import { useAppDispatch, useAppSelector } from '@/store/store'

export function useAuth() {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state) => state.spaceUser.isLogin)

  const logout = () => {
    dispatch(storeLogout())
  }

  const login = (token: string) => {
    dispatch(storeLogin(token))
  }

  return {
    login,
    logout,
    isLogin,
  }
}
