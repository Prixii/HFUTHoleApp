import { useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/store'
import { getCourseDate } from '@/shared/utils/spaceCourse'
import { changeSchedule } from '@/store/reducer/spaceCourse'
import { useMount } from 'ahooks'
import { format } from 'date-fns'

const defaultVisibleDate = '01月01号'

export const useDaySchedule = () => {
  const { daySchedule, courseInfo } = useAppSelector(
    (state) => state.spaceCourse
  )
  const dispatch = useAppDispatch()

  const todayCourse = useMemo(
    () => courseInfo.schedule[daySchedule.weekIdx][daySchedule.dayIdx],
    [daySchedule, courseInfo]
  )

  const visibleDate = useMemo(() => {
    const semesterStartDate = courseInfo.mainInfo.semesterStartDate
    if (!semesterStartDate) {
      return defaultVisibleDate
    }
    return format(
      getCourseDate({
        daySchedule,
        startTime: semesterStartDate,
      }),
      'MM月dd号'
    )
  }, [daySchedule, courseInfo])

  useMount(() => {
    dispatch(changeSchedule(undefined))
  })

  return {
    todayCourse,
    daySchedule,
    visibleDate,
  }
}
