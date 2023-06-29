import type { SpaceCourseState } from '@/store/reducer/spaceCourse'
import { useAppSelector } from '@/store/store'
import { getCourseDate } from '@/pages/space/@utils/utils'
import { useMemo } from 'react'

const defaultStartDate = '2023-01-01'

export const useScheduleVisibleWeek = (
  scheduleKey: Extract<keyof SpaceCourseState, 'daySchedule' | 'weekSchedule'>
) => {
  const spaceCourse = useAppSelector((state) => state.spaceCourse)
  const semesterStartDate =
    spaceCourse.courseInfo.mainInfo.semesterStartDate || defaultStartDate
  const { dayIdx, weekIdx } = spaceCourse[scheduleKey]

  const scheduleVisibleWeek = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        date: getCourseDate({
          weekIdx,
          dayIdx: i,
          startTime: semesterStartDate,
        }),
        active: dayIdx === i,
      })),
    [dayIdx, weekIdx, semesterStartDate]
  )

  return scheduleVisibleWeek
}
