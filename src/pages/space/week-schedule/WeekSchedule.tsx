import { WeekScheduleModule } from '@/pages/space/components/WeekScheduleModule/WeekScheduleModule'
import { Header } from '@/pages/space/components/WeekScheduleModule/Header'
import { ScheduleList } from '@/pages/space/components/WeekScheduleModule/ScheduleList'
import { AbsoluteBottom } from '@/pages/space/components/WeekScheduleModule/AbsoluteBottom'
import { useSpaceCourse } from '@/swr/space/course'
import { useScheduleVisibleWeek } from '@/pages/space/@utils/useScheduleVisibleWeek'
import { useWeekSchedule } from '@/pages/space/week-schedule/useWeekSchedule'
import { useChangeWeek } from '@/pages/space/@utils/useWeekChange'
import { useCurrentSemester } from '@/shared/context/space/semester'
import { useSemesters } from '@/swr/space/chore'

export const WeekSchedule = () => {
  const { isFetching, refetch } = useSpaceCourse()
  const weekScheduleVisibleWeek = useScheduleVisibleWeek('weekSchedule')
  const {
    currentWeek,
    weekSchedule: { weekIdx },
  } = useWeekSchedule()
  const { weekLayout } = useWeekSchedule()
  const { onPrev, onNext } = useChangeWeek('weekSchedule')
  const { selectedSemesterId, setSelectedSemesterId } = useCurrentSemester()
  const { data: semesters } = useSemesters()

  return (
    <WeekScheduleModule
      isFetching={isFetching}
      onRefresh={refetch}
      header={
        <Header
          currentWeek={currentWeek}
          weekIdx={weekIdx}
          weekScheduleVisibleWeek={weekScheduleVisibleWeek}
        />
      }
      scheduleList={<ScheduleList weekLayout={weekLayout} />}
      absoluteBottom={
        <AbsoluteBottom
          onPrev={onPrev}
          onNext={onNext}
          currentSemesterId={selectedSemesterId}
          semesters={semesters}
          onSemesterChange={setSelectedSemesterId}
        />
      }
    />
  )
}
