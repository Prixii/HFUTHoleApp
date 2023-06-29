import { useAppDispatch, useAppSelector } from '@/store/store'
import { setDaySchedule } from '@/store/reducer/spaceCourse'
import { useCallback } from 'react'

export const useChangeDay = () => {
  const daySchedule = useAppSelector((state) => state.spaceCourse.daySchedule)
  const dispatch = useAppDispatch()

  const onPrev = useCallback(() => {
    const { dayIdx, weekIdx } = daySchedule
    if (dayIdx === 0) {
      dispatch(
        setDaySchedule({
          dayIdx: 6,
          weekIdx: weekIdx === 0 ? 19 : weekIdx - 1,
        })
      )
    } else {
      dispatch(
        setDaySchedule({
          dayIdx: dayIdx - 1,
          weekIdx,
        })
      )
    }
  }, [daySchedule])

  const onNext = useCallback(() => {
    const { dayIdx, weekIdx } = daySchedule
    if (dayIdx === 6) {
      dispatch(
        setDaySchedule({
          dayIdx: 0,
          weekIdx: weekIdx === 19 ? 0 : weekIdx + 1,
        })
      )
    } else {
      dispatch(
        setDaySchedule({
          dayIdx: dayIdx + 1,
          weekIdx,
        })
      )
    }
  }, [daySchedule])

  return {
    onPrev,
    onNext,
  }
}
