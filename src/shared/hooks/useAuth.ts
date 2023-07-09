import { useLinkTo } from '@react-navigation/native'
import {
  logout as storeLogout,
  login as storeLogin,
} from '@/store/reducer/user'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { logout as spaceLogout } from '@/store/reducer/spaceUser'
import { resetStore } from '@/store/reducer/spaceCourse'
import { useCallback } from 'react'

export function useAuth() {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state) => state.user.isLogin)
  const linkTo = useLinkTo()

  const logout = useCallback(() => {
    dispatch(storeLogout())
    dispatch(spaceLogout())
    dispatch(resetStore())
    linkTo('/auth')
  }, [dispatch, linkTo])

  const login = (token: string) => {
    dispatch(storeLogin(token))
  }

  return {
    logout,
    login,
    isLogin,
  }
}
