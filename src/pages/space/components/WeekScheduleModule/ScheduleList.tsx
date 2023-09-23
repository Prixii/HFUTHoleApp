import type { Colors, CourseSchedule } from '@/pages/space/@utils/types'
import type { UnitSchedule } from '@/pages/space/@utils/types'
import { Pressable, View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import {
  generateCardStyle,
  formatRoom,
  formatCourseName,
  getLongestSchedule,
} from '@/pages/space/@utils/utils'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ScheduleSheet } from '@/pages/space/components/ScheduleSheet/ScheduleSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { BottomActionSheet } from '@/components/sheet/BottomActionSheet'
import { ScheduleCard as DayScheduleCard } from '@/pages/space/day-schedule/components/ScheduleList'
import { PulsIcon } from '@/components/icon'
import { CustomScheduleSheet } from '@/pages/space/components/WeekScheduleModule/CustomScheduleSheet'
import { useAppSelector } from '@/store/store'
import { useSpaceCourse } from '@/swr/space/course'
import { isEqualArray } from '@/shared/utils/utils'

interface WeekScheduleItem {
  schedules: CourseSchedule[]
  layoutIndex: number
  style: {
    borderRightWidth: number
    borderBottomWidth: number
    paddingTop: number
    paddingBottom: number
  }
}

interface CardProps {
  schedules: CourseSchedule[]
  openSheet: (schedule: UnitSchedule) => void
}

interface ScheduleListProps {
  weekLayout: WeekScheduleItem[][]
  readonly?: boolean
}

export const ScheduleList = ({
  weekLayout,
  readonly = false,
}: ScheduleListProps) => {
  const weekVisibleSchedule = useAppSelector(
    (state) => state.spaceCourse.weekSchedule
  )
  const [schedule, setSchedule] = useState<UnitSchedule>()
  const [activeIndexArr, setActiveIndexArr] = useState([-1, -1])
  const [customSchedule, setCustomSchedule] = useState<UnitSchedule>()
  const scheduleSheetRef = useRef<BottomSheetModal>(null)
  const diyScheduleSheetRef = useRef<BottomSheetModal>(null)
  const { refetch } = useSpaceCourse()

  const openScheduleSheet = (schedule: UnitSchedule) => {
    setSchedule(schedule)
    scheduleSheetRef.current?.present()
  }

  const openDiyScheduleSheet = () => {
    diyScheduleSheetRef.current?.present()
  }

  const initActiveIndex = () => setActiveIndexArr([-1, -1])

  const onAddScheduleSuccess = () => {
    initActiveIndex()
    diyScheduleSheetRef.current?.close()
    refetch()
    setCustomSchedule(undefined)
  }

  const onScheduleUpdate = (schedule: UnitSchedule) => {
    setCustomSchedule(schedule)
    diyScheduleSheetRef.current?.present()
  }

  return (
    <View className="w-full flex flex-row">
      {weekLayout.map((dayLayout, dayLayoutIndex) => (
        <View key={dayLayoutIndex} className="flex-1">
          {dayLayout.map(({ layoutIndex, schedules, style }) => (
            <Pressable
              className="w-full px-[2px] h-[62px] border-slate-200 "
              key={layoutIndex}
              style={style}
              onPress={() => setActiveIndexArr([dayLayoutIndex, layoutIndex])}
            >
              {!readonly &&
                isEqualArray(activeIndexArr, [dayLayoutIndex, layoutIndex]) && (
                  <View className="w-full h-full rounded-md overflow-hidden">
                    <TouchableRipple
                      className="w-full h-full justify-center items-center "
                      onPress={openDiyScheduleSheet}
                    >
                      <PulsIcon />
                    </TouchableRipple>
                  </View>
                )}

              <Card schedules={schedules} openSheet={openScheduleSheet} />
            </Pressable>
          ))}
        </View>
      ))}
      <CustomScheduleSheet
        ref={diyScheduleSheetRef}
        weekLayoutIndex={activeIndexArr}
        currentWeekIndex={weekVisibleSchedule.weekIdx}
        customSchedule={customSchedule}
        onAddScheduleSuccess={onAddScheduleSuccess}
      />
      <ScheduleSheet
        ref={scheduleSheetRef}
        schedule={schedule}
        onUpdate={onScheduleUpdate}
      />
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

  const handleOpenSheet = useCallback(
    (schedule: UnitSchedule) => {
      openSheet(schedule)
      sheetRef.current?.dismiss()
    },
    [openSheet]
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
      <BottomActionSheet ref={sheetRef} snapPoints={['30%', '50%']}>
        <BottomSheetScrollView>
          <View className="flex space-y-4 p-4">
            {schedules.map((schedule) => (
              <View key={schedule.courseName}>
                <DayScheduleCard
                  openSheet={() => handleOpenSheet(schedule)}
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
