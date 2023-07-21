import { SWRKeys } from '@/swr/utils'
import { useQuery } from 'react-query'
import {
  getCourseListRequest,
  type CourseListRequestDto,
} from '@/request/spaceApis/course'
import { useAppDispatch } from '@/store/store'
import { changeCourseInfo, changeSchedule } from '@/store/reducer/spaceCourse'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'
import { useImmer } from 'use-immer'
import { useEffect } from 'react'

export const useSpaceCourse = () => {
  const dispatch = useAppDispatch()
  const { isLogin } = useAuth()
  const [key, setKey] = useImmer<[string, CourseListRequestDto]>([
    SWRKeys.space.course.all,
    {},
  ])

  const query = useQuery<ICourseResponse>(key, {
    enabled: isLogin,
    retry: false,
    queryFn: () => getCourseListRequest(key[1]),
    onSuccess(data) {
      dispatch(changeCourseInfo(data))
      dispatch(changeSchedule(undefined))
    },
  })

  useEffect(() => {
    isLogin && query.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])

  return query
}
