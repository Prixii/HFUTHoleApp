import { useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/store'
import {
  getCourseDate,
  DAY_HOURS,
  CARD_COLORS_KEYS,
} from '@/pages/space/@utils/utils'
import { changeSchedule } from '@/store/reducer/spaceCourse'
import { useMount } from 'ahooks'
import { format } from 'date-fns'
import { deepClone } from '@/shared/utils/utils'

const defaultVisibleDate = '01月01号'

export type Schedule = ISchedule & ILesson & { color: string }

export const useDaySchedule = () => {
  const dispatch = useAppDispatch()
  const { daySchedule, courseInfo } = useAppSelector(
    (state) => state.spaceCourse
  )
  const campus = useAppSelector((state) => state.spaceUser.info.campus)

  const timeLines = useMemo(() => {
    const hoursClone = deepClone(DAY_HOURS)
    if (campus === '翡翠湖校区') {
      hoursClone[0].start = '08:10'
      hoursClone[2].start = '12:10'
    }
    return hoursClone
  }, [campus])

  const todaySchedule = useMemo(() => {
    if (!courseInfo.schedule.length) {
      return []
    }
    return courseInfo.schedule[daySchedule.weekIdx][daySchedule.dayIdx]
  }, [daySchedule, courseInfo])

  const scheduleList = useMemo(
    () =>
      timeLines.map((timeLine) => {
        const schedules = todaySchedule
          .filter((schedule) => schedule.index === timeLine.index)
          .map<Schedule>((schedule) => {
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
            }
          })

        return {
          timeLine,
          schedules,
        }
      }),
    [timeLines, todaySchedule, courseInfo]
  )

  const visibleDate = useMemo(() => {
    const semesterStartDate = courseInfo.mainInfo.semesterStartDate
    if (!semesterStartDate) {
      return defaultVisibleDate
    }
    return format(
      getCourseDate({
        ...daySchedule,
        startTime: semesterStartDate,
      }),
      'MM月dd号'
    )
  }, [daySchedule, courseInfo])

  useMount(() => {
    dispatch(changeSchedule(undefined))
  })

  return {
    todaySchedule,
    daySchedule,
    visibleDate,
    scheduleList,
  }
}
