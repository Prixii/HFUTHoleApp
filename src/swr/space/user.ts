import { SWRKeys } from '@/swr/utils'
import { useSpaceAuth } from '@/pages/space/@utils/useSpaceAuth'
import { useQuery } from 'react-query'
import { getUserInfoRequest } from '@/request/space/user'
import { useAppDispatch } from '@/store/store'
import { setUserInfo, setUserCard } from '@/store/reducer/spaceUser'
import { getUserCardBaseRequest } from '@/request/space/user'

const userInfoKey = [SWRKeys.space.user.info]
const userCardBaseKey = [SWRKeys.space.user.cardBase]

export const useSpaceUserInfo = () => {
  const dispatch = useAppDispatch()
  const { isLogin } = useSpaceAuth()

  const query = useQuery(userInfoKey, {
    enabled: isLogin,
    retry: false,
    queryFn: getUserInfoRequest,
    onSuccess(data) {
      dispatch(setUserInfo(data))
    },
  })

  return query
}

export const useUserCardBase = () => {
  const dispatch = useAppDispatch()
  const { isLogin } = useSpaceAuth()

  const query = useQuery(userInfoKey, {
    enabled: isLogin,
    retry: false,
    queryFn: getUserCardBaseRequest,
    onSuccess(res) {
      dispatch(setUserCard(res.data))
    },
  })

  return query
}
