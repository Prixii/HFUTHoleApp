import { SWRKeys } from '@/swr/utils'
import { useQuery } from 'react-query'
import { getCourseListRequest } from '@/request/spaceApis/course'
import { useAppDispatch } from '@/store/store'
import { changeCourseInfo, changeSchedule } from '@/store/reducer/spaceCourse'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'

const courseAllKey = [SWRKeys.space.course.all, false, 214] // TODO semester 先写死

export const useSpaceCourse = () => {
  const dispatch = useAppDispatch()
  const { isLogin } = useAuth()

  const query = useQuery<ICourse>(courseAllKey, {
    enabled: isLogin,
    retry: false,
    queryFn: ({ queryKey }) =>
      getCourseListRequest(
        queryKey[1] as boolean,
        queryKey[2] as number | undefined
      ),
    onSuccess(data) {
      dispatch(changeCourseInfo(data))
      dispatch(changeSchedule(undefined))
    },
  })

  const refetch = (refresh = false, semesterId?: number) =>
    query.refetch({
      queryKey: [...courseAllKey, refresh, semesterId],
    })

  return {
    ...query,
    refetch,
  }
}
