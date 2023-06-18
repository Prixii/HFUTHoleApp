import { addDays, differenceInCalendarDays } from 'date-fns'
import { VisibleSchedule } from '@/store/reducer/spaceCourse'

export function calculateWeekAndDay(startDate: string) {
  const defaultSchedule = {
    week: 0,
    day: 0,
  }
  if (!startDate) {
    return defaultSchedule
  }

  const differenceDays = differenceInCalendarDays(
    new Date(),
    new Date(startDate)
  )
  if (differenceDays < 0) {
    return defaultSchedule
  }
  const week = Math.floor(differenceDays / 7)
  const day = differenceDays % 7
  return {
    week: week > 19 ? 19 : week,
    day,
  }
}

interface GetDateProp {
  daySchedule: VisibleSchedule
  startTime: string
}

export function getCourseDate(param: GetDateProp) {
  const startTime = addDays(new Date(param.startTime), -1)
  const { dayIdx, weekIdx } = param.daySchedule

  return new Date(
    startTime.getTime() +
      weekIdx * 7 * 24 * 60 * 60 * 1000 +
      (dayIdx + 1) * 24 * 60 * 60 * 1000
  )
}
