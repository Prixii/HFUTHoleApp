import { SWRKeys } from '@/swr/utils'
import { useSpaceAuth } from '@/pages/space/@utils/useSpaceAuth'
import { useQuery } from 'react-query'
import { getUserInfoRequest } from '@/request/space/user'
import { useAppDispatch } from '@/store/store'
import { setUserInfo } from '@/store/reducer/spaceUser'

const userInfoKey = [SWRKeys.space.user.info]

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
