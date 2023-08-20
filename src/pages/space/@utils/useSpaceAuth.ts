import {
  logout as storeLogout,
  login as storeLogin,
} from '@/store/reducer/spaceUser'
import { resetStore as resetCourseStore } from '@/store/reducer/spaceCourse'
import { resetStore as resetScoreStore } from '@/store/reducer/spaceScore'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useCallback } from 'react'

export function useAuth() {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state) => state.spaceUser.isLogin)

  const logout = useCallback(() => {
    dispatch(storeLogout())
    dispatch(resetCourseStore())
    dispatch(resetScoreStore())
  }, [dispatch])

  const login = useCallback(
    (token: string) => {
      dispatch(storeLogin(token))
    },
    [dispatch]
  )

  return {
    login,
    logout,
    isLogin,
  }
}
