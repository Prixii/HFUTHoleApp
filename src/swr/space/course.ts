import { SWRKeys } from '@/swr/utils'
import { useQuery } from 'react-query'
import { getCourseListRequest } from '@/request/space/course'
import { useAppDispatch } from '@/store/store'
import { changeCourseInfo, changeSchedule } from '@/store/reducer/spaceCourse'
import { useSpaceAuth } from '@/pages/space/@utils/useSpaceAuth'
import { useEffect } from 'react'
import { useCurrentSemester } from '@/shared/context/space/semester'
import { initializeCourseSchedule } from '@/pages/space/@utils/spaceCourseStore'

// 依赖 currentSemesterId 与 isLogin
export const useSpaceCourse = () => {
  const dispatch = useAppDispatch()
  const { selectedSemesterId, currentSemesterId } = useCurrentSemester()
  const { isLogin } = useSpaceAuth()

  const params = { semesterId: selectedSemesterId }
  const key = [SWRKeys.space.course.all, params]

  const query = useQuery<ICourseResponse>(key, {
    enabled: isLogin && !!selectedSemesterId,
    queryFn: () => getCourseListRequest(params),
  })

  // 为了解决切换学期的时候，不更新课表state
  useEffect(() => {
    const { data } = query
    if (!data) {
      return
    }
    dispatch(changeCourseInfo(data))
    initializeCourseSchedule(selectedSemesterId, currentSemesterId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSemesterId, dispatch, query.data, selectedSemesterId])

  // 退出重新登陆的情况
  useEffect(() => {
    isLogin && query.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])

  return query
}
