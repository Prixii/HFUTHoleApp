import { SWRKeys } from '@/swr/utils'
import { useQuery } from 'react-query'
import { getCourseListRequest } from '@/request/spaceApis/course'
import { useAppDispatch } from '@/store/store'
import { changeCourseInfo } from '@/store/reducer/spaceCourse'

// TODO 未登录时，不要发请求
export const useSpaceCourse = () => {
  const key = [SWRKeys.spaceCourse.all, false]
  const dispatch = useAppDispatch()

  const query = useQuery<ICourseResponse>(key, {
    queryFn: ({ queryKey }) =>
      getCourseListRequest(
        queryKey[1] as boolean,
        queryKey[2] as number | undefined
      ),
    onSuccess(data) {
      dispatch(changeCourseInfo(data))
    },
  })

  const refetch = (refresh = false, semesterId?: number) =>
    query.refetch({
      queryKey: [...key, refresh, semesterId],
    })

  return {
    ...query,
    refetch,
  }
}
