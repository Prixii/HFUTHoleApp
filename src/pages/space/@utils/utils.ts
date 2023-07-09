import { addDays, differenceInCalendarDays } from 'date-fns'
import { VisibleSchedule } from '@/store/reducer/spaceCourse'
import { ellipsisString } from '@/shared/utils/string'

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

interface GetDateProp extends VisibleSchedule {
  startTime: string
}

export function getCourseDate({ dayIdx, startTime, weekIdx }: GetDateProp) {
  const startDate = addDays(new Date(startTime), -1)

  return new Date(
    startDate.getTime() +
      weekIdx * 7 * 24 * 60 * 60 * 1000 +
      (dayIdx + 1) * 24 * 60 * 60 * 1000
  )
}

export const DAY_HOURS = [
  { start: '08:00', index: 1 },
  { start: '10:00', index: 2 },
  { start: '12:00', index: null },
  { start: '14:00', index: 3 },
  { start: '16:00', index: 4 },
  { start: '18:00', index: null },
  { start: '19:00', index: 5 },
  { start: '22:00', index: 7 },
]

export const CARD_COLORS = {
  red: '248, 140, 142',
  blue: '99, 177, 239',
  green: '62, 183, 112',
  yellow: '248, 160, 67',
  purple: '185, 103, 227',
  'light-yellow': '253, 152, 0',
  'light-blue': '0, 165, 241',
  pink: '241, 103, 186',
  grown: '203, 167, 19',
  'light-green': '60, 179, 201',
}

export const CARD_COLORS_KEYS = Object.keys(
  CARD_COLORS
) as unknown as keyof typeof CARD_COLORS

export function formatRoom(room: string) {
  if (room === 'null') {
    return '暂未安排教室'
  } else {
    return ellipsisString(room, 12)
  }
}

export function isLaunchPeriod(timeStr: string) {
  return timeStr === '12:00' || timeStr === '12:10'
}

export function getTeachers(teachers?: string[]) {
  return teachers ? teachers?.join('/') : ''
}
