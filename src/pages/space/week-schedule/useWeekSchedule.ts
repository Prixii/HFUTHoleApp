import { useAppSelector } from '@/store/store'
import { useMemo } from 'react'
import {
  CARD_COLORS_KEYS,
  WEEK_SCHEDULE_CARD_HEIGHT,
} from '@/pages/space/@utils/utils'
import type { CourseSchedule } from '@/pages/space/@utils/types'

export const useWeekSchedule = () => {
  const { weekSchedule, courseInfo } = useAppSelector(
    (state) => state.spaceCourse
  )

  const scheduleList = useMemo(
    () =>
      courseInfo.schedule[weekSchedule.weekIdx].map<CourseSchedule[]>((week) =>
        week.map<CourseSchedule>((schedule) => {
          const lesson = courseInfo.lessons[schedule.lessonIndex || 0]
          const color = lesson.detailInfo.color
            ? lesson.detailInfo.color
            : CARD_COLORS_KEYS[
                schedule.lessonIndex % (CARD_COLORS_KEYS.length - 1)
              ]

          return {
            ...schedule,
            ...lesson,
            color,
            height: schedule.period * WEEK_SCHEDULE_CARD_HEIGHT,
          }
        })
      ),
    [courseInfo, weekSchedule]
  )

  const weekLayout = useMemo(
    () =>
      Array.from({ length: 7 }, (_, dayIndex) =>
        Array.from({ length: 11 }, (_, index) => {
          return {
            schedules: scheduleList[dayIndex].filter(
              (item) => item.lessonStartIndex === index + 1
            ),
            layoutIndex: index + 1,
            style: {
              borderRightWidth: dayIndex !== 6 ? 1 : 0,
              borderBottomWidth: index % 2 === 0 ? 0 : 1,
              paddingTop: index % 2 === 0 ? 1 : 0,
              paddingBottom: index % 2 === 0 ? 0 : 1,
            },
          }
        })
      ),
    [scheduleList]
  )

  return {
    scheduleList,
    weekSchedule,
    weekLayout,
    currentWeek: courseInfo.mainInfo.curWeek,
  }
}
