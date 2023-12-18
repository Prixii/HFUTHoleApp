import { useAppSelector } from '@/store/store'
import { useMemo } from 'react'
import { isToday } from 'date-fns'
import { useSpaceAuth } from '@/pages/space/@utils/useSpaceAuth'

export interface ExamInfo {
  isExpired: boolean
  startDate: Date
  isToday: boolean
  endDate: Date
  detail: IExam
}

export function useSpaceData() {
  const { courseInfo } = useAppSelector((state) => state.spaceCourse)
  const user = useAppSelector((state) => state.spaceUser)
  const spaceAuth = useSpaceAuth()

  const exams = useMemo<ExamInfo[]>(() => {
    return (
      courseInfo.exams
        ?.map((item) => {
          const date = item.date
          const startDate = new Date(`${date} ${item.startTime}`)
          const endDate = new Date(`${date} ${item.endTime}`)
          const currentDate = new Date()
          const isExpired = currentDate > endDate
          const isTodayExam = isToday(endDate)

          return {
            isExpired,
            startDate,
            isToday: isTodayExam,
            endDate,
            detail: item,
          }
        })
        ?.sort(
          (prev, cur) => (prev.startDate as any) - (cur.startDate as any),
        ) || []
    )
  }, [courseInfo.exams])

  const recentExams = useMemo(() => {
    return exams.filter((item) => !item?.isExpired)
  }, [exams])

  return {
    exams,
    recentExams,
    spaceAuth,
    user,
  }
}
