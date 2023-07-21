import type { Schedule } from '@/pages/space/@utils/types'
import type { ArrayElementType } from '@/shared/types/utils'
import type { Colors } from '@/pages/space/@utils/types'
import { useDaySchedule } from '@/pages/space/day-schedule/useDaySchedule'
import { View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { ListEmpty } from '@/components/image/ListEmpty'
import {
  formatRoom,
  generateCardStyle,
  getTeachers,
  isLaunchPeriod,
  formatCourseName,
  getLongestSchedule,
} from '@/pages/space/@utils/utils'
import { useHorizontalGesture } from '@/pages/space/@utils/useHorizontalGesture'
import { useChangeDay } from '@/pages/space/@utils/useDayChange'
import { useMemo } from 'react'

type ScheduleListItem = ArrayElementType<
  ReturnType<typeof useDaySchedule>['scheduleList']
>

interface CardProps {
  scheduleListItem: ScheduleListItem
}

export const ScheduleList = () => {
  const { scheduleList, todaySchedule } = useDaySchedule()
  const { onPrev, onNext } = useChangeDay()
  const { onTouchStart, onTouchEnd } = useHorizontalGesture({ onPrev, onNext })

  return (
    <View
      className="w-full h-full bg-white overflow-hidden mt-10 rounded-t-3xl py-5"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {todaySchedule.length ? (
        <View className="w-[90%] mx-auto mt-5">
          {scheduleList.map((scheduleListItem) => (
            <View
              className="flex flex-row"
              key={scheduleListItem.timeLine.start}
            >
              <View className="relative" style={{ flex: 1 }}>
                <Text className="absolute -top-2 text-slate-400 text-xs">
                  {scheduleListItem.timeLine.start}
                </Text>
              </View>

              <View className="relative pb-2" style={{ flex: 5 }}>
                <View className="absolute -left-4 h-[1px] w-[200%] bg-slate-300/80" />
                <Card scheduleListItem={scheduleListItem} />
              </View>
            </View>
          ))}
        </View>
      ) : (
        <ListEmpty size={200} />
      )}
    </View>
  )
}

const Card = ({ scheduleListItem }: CardProps) => {
  const { schedules, timeLine } = scheduleListItem

  // 22:00 后不渲染
  if (timeLine.index === 7) {
    return null
  }

  if (isLaunchPeriod(timeLine.start)) {
    return (
      <View className="flex justify-center items-center rounded-lg h-12 bg-slate-200/50">
        <Text className="text-lg text-slate-400">午休</Text>
      </View>
    )
  }

  if (schedules.length === 0) {
    return <View className="h-24" />
  }

  // TODO 日程冲突情况
  if (schedules.length > 1) {
    return <ConflictCard scheduleListItem={scheduleListItem} />
  }

  return <ScheduleCard schedule={schedules[0]} timeLine={timeLine} />
}

const ConflictCard = ({ scheduleListItem: { schedules } }: CardProps) => {
  const scheduleLongest = useMemo(
    () => getLongestSchedule(schedules),
    [schedules]
  )

  const { cardStyle, textStyle } = useMemo(
    () => generateCardStyle(scheduleLongest.color as Colors, true),
    [scheduleLongest.color]
  )

  return (
    <Pressable
      style={cardStyle}
      className={`flex border border-l-2 justify-center h-24 p-3 rounded-lg mt-2`}
    >
      <Text style={textStyle} className="text-base font-bold">
        {`这里有${schedules.length}门课冲突`}
      </Text>
      <Text style={textStyle}>点击插件详情</Text>
    </Pressable>
  )
}

const ScheduleCard = ({
  schedule,
  timeLine,
}: {
  schedule: Schedule
  timeLine: ScheduleListItem['timeLine']
}) => {
  const { cardStyle, textStyle } = useMemo(
    () => generateCardStyle(schedule.color as Colors, true),
    [schedule.color]
  )

  return (
    <Pressable
      style={cardStyle}
      className={`flex border border-l-2 justify-center h-22 p-3 rounded-lg ${
        timeLine.start === schedule.startTime ? '' : 'mt-2'
      }`}
    >
      <View className="flex flex-row justify-between">
        <Text
          style={textStyle}
          className="text-xs"
        >{`${schedule.startTime} - ${schedule.endTime}`}</Text>
        <Text style={textStyle} className="text-xs">
          {getTeachers(schedule.detailInfo.teachers || [])}
        </Text>
      </View>
      <Text style={textStyle} className="text-base font-bold">
        {formatCourseName(schedule.courseName)}
      </Text>
      <Text style={textStyle}>{formatRoom(schedule.room)}</Text>
    </Pressable>
  )
}
