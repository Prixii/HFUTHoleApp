import { dispatch } from '@/store/store'
import { changeSchedule } from '@/store/reducer/spaceCourse'

export const initializeCourseSchedule = <T = number | string | undefined>(
  selectedSemesterId: T,
  currentSemesterId: T
) => {
  if (selectedSemesterId === currentSemesterId) {
    dispatch(changeSchedule())
  } else {
    dispatch(changeSchedule({ day: 0, week: 0 }))
  }
}
