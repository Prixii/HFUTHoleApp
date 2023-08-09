import type { Colors, CourseSchedule } from '@/pages/space/@utils/types'
import type { UnitSchedule } from '@/pages/space/@utils/types'
import { useWeekSchedule } from '@/pages/space/week-schedule/useWeekSchedule'
import { Pressable, View } from 'react-native'
import { Text } from 'react-native-paper'
import {
  generateCardStyle,
  formatRoom,
  formatCourseName,
  getLongestSchedule,
} from '@/pages/space/@utils/utils'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ScheduleSheet } from '@/pages/space/components/ScheduleSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { BottomActionSheet } from '@/components/sheet/BottomActionSheet'
import { ScheduleCard as DayScheduleCard } from '@/pages/space/day-schedule/components/ScheduleList'

interface CardProps {
  schedules: CourseSchedule[]
  openSheet: (schedule: UnitSchedule) => void
}

export const CourseList = () => {
  const [schedule, setSchedule] = useState<UnitSchedule>()
  const sheetRef = useRef<BottomSheetModal>(null)
  const { weekLayout } = useWeekSchedule()

  const openSheet = (schedule: UnitSchedule) => {
    setSchedule(schedule)
    sheetRef.current?.present()
  }

  return (
    <View className="w-full flex flex-row">
      {weekLayout.map((dayLayout, dayLayoutIndex) => (
        <View key={dayLayoutIndex} className="flex-1">
          {dayLayout.map(({ layoutIndex, schedules, style }) => (
            <View
              className="w-full px-[2px] h-[62px] border-slate-200 "
              key={layoutIndex}
              style={style}
            >
              <Card schedules={schedules} openSheet={openSheet} />
            </View>
          ))}
        </View>
      ))}
      <ScheduleSheet ref={sheetRef} schedule={schedule} />
    </View>
  )
}

const Card = ({ schedules, openSheet }: CardProps) => {
  const { length } = schedules

  if (length === 0) {
    return null
  }

  if (length > 1) {
    return <ConflictCard schedules={schedules} openSheet={openSheet} />
  }

  return <ScheduleCard schedule={schedules[0]} openSheet={openSheet} />
}

const ConflictCard = ({ schedules, openSheet }: CardProps) => {
  const sheetRef = useRef<BottomSheetModal>(null)

  const scheduleLongest = useMemo(
    () => getLongestSchedule(schedules),
    [schedules]
  )

  const { cardStyle, textStyle } = useMemo(
    () => generateCardStyle(scheduleLongest.color as Colors),
    [scheduleLongest]
  )

  return (
    <>
      <Pressable
        className="w-full rounded-lg px-1 pt-1"
        style={[cardStyle, { height: scheduleLongest.height }]}
        onPress={() => sheetRef.current?.present()}
      >
        <Text
          style={textStyle}
          className="font-bold mb-2"
        >{`这里有${schedules.length}门课冲突`}</Text>
        <Text style={textStyle} className="text-[11px]">
          点击查看详情
        </Text>
      </Pressable>
      <BottomActionSheet ref={sheetRef} snapPoints={['25%', '50%']}>
        <BottomSheetScrollView>
          <View className="flex space-y-4 p-4">
            {schedules.map((schedule) => (
              <View key={schedule.courseName}>
                <DayScheduleCard
                  openSheet={() => {
                    openSheet(schedule)
                    sheetRef.current?.close()
                  }}
                  schedule={schedule}
                />
              </View>
            ))}
          </View>
        </BottomSheetScrollView>
      </BottomActionSheet>
    </>
  )
}

interface ScheduleCard {
  schedule: CourseSchedule
  openSheet: (schedule: UnitSchedule) => void
}

const ScheduleCard = ({ schedule, openSheet }: ScheduleCard) => {
  const { cardStyle, textStyle } = useMemo(
    () => generateCardStyle(schedule.color as Colors),
    [schedule]
  )

  const handlePress = useCallback(
    () => openSheet(schedule),
    [openSheet, schedule]
  )

  return (
    <Pressable
      className={
        'w-full h-full rounded-md px-1 pt-2 pb-4 justify-between items-center'
      }
      style={[cardStyle, { height: schedule.height }]}
      onPress={handlePress}
    >
      <Text style={textStyle} className="font-bold text-xs">
        {formatCourseName(schedule.courseName)}
      </Text>
      <Text style={textStyle} className="text-[10px]">
        {formatRoom(schedule.room)}
      </Text>
    </Pressable>
  )
}
