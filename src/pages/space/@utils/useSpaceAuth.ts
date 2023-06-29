import {
  logout as storeLogout,
  login as storeLogin,
} from '@/store/reducer/spaceUser'
import { resetStore } from '@/store/reducer/spaceCourse'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useCallback } from 'react'

export function useAuth() {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state) => state.spaceUser.isLogin)

  const logout = useCallback(() => {
    dispatch(storeLogout())
    dispatch(resetStore())
  }, [dispatch, storeLogout, resetStore])

  const login = useCallback(
    (token: string) => {
      dispatch(storeLogin(token))
    },
    [dispatch, storeLogin]
  )

  return {
    login,
    logout,
    isLogin,
  }
}
